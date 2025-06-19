import io
import os
import tempfile
from datetime import datetime
from typing import Dict, Any
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse
import pikepdf
from PIL import Image
from PyPDF2 import PdfReader, PdfWriter

from .core import validate_pdf, cleanup_temp_files, logger

def optimize_pdf(input_path: str, output_path: str, options: Dict[str, Any] = None) -> bool:
    """Optimize PDF file size with various strategies."""
    try:
        if options is None:
            options = {
                "compress_images": True,
                "image_quality": 80,
                "compress_fonts": True,
                "remove_metadata": False
            }
        
        pdf = pikepdf.open(input_path)
        
        if options.get("compress_images", True):
            for page in pdf.pages:
                for name, image in page.images.items():
                    if image.Subtype == "/Image":
                        if image.ColorSpace == "/DeviceCMYK":
                            image_data = image.read_bytes()
                            img = Image.frombytes("CMYK", (image.Width, image.Height), image_data)
                            img = img.convert("RGB")
                            output = io.BytesIO()
                            img.save(output, format="JPEG", quality=options.get("image_quality", 80))
                            image.write(output.getvalue(), filter=pikepdf.Name("/DCTDecode"))
        
        if options.get("remove_metadata", False):
            pdf.docinfo.clear()
        
        pdf.save(output_path, compress_streams=True, preserve_pdfa=True)
        return True
    except Exception as e:
        logger.error(f"PDF optimization error: {str(e)}")
        return False

async def optimize_pdf_file(
    file: UploadFile,
    options: Dict[str, Any],
    background_tasks
) -> StreamingResponse:
    """Optimize PDF file size using various compression techniques."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_input_path = None
    temp_output_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_input_path = temp_file.name
            
            temp_output_path = f"{temp_input_path}_optimized.pdf"
            
            if optimize_pdf(temp_input_path, temp_output_path, options):
                with open(temp_output_path, "rb") as f:
                    content = f.read()
                
                original_size = os.path.getsize(temp_input_path)
                optimized_size = os.path.getsize(temp_output_path)
                
                background_tasks.add_task(cleanup_temp_files, [temp_input_path, temp_output_path])
                
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"optimized_{timestamp}.pdf"
                
                return StreamingResponse(
                    io.BytesIO(content),
                    media_type="application/pdf",
                    headers={
                        "Content-Disposition": f"attachment; filename={filename}",
                        "X-Original-Size": str(original_size),
                        "X-Optimized-Size": str(optimized_size),
                        "X-Size-Reduction": f"{((original_size - optimized_size) / original_size) * 100:.1f}%"
                    }
                )
            else:
                raise HTTPException(status_code=400, detail="PDF optimization failed")
    
    except Exception as e:
        logger.error(f"PDF optimization error: {str(e)}")
        cleanup_temp_files([f for f in [temp_input_path, temp_output_path] if f])
        raise HTTPException(status_code=500, detail=f"PDF optimization failed: {str(e)}")

async def compress_pdf(
    file: UploadFile,
    quality: int,
    background_tasks
) -> StreamingResponse:
    """Reduce the file size of a PDF document."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            with pikepdf.Pdf.open(temp_file_path) as pdf:
                output = io.BytesIO()
                pdf.save(
                    output,
                    compress_streams=True,
                    preserve_pdfa=False,
                    object_stream_mode=pikepdf.ObjectStreamMode.generate,
                    linearize=False,
                    qdf=False
                )
                output.seek(0)
                
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"compressed_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF compression error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"PDF compression failed: {str(e)}") 