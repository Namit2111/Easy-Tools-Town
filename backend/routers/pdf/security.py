import io
import tempfile
from datetime import datetime
from typing import Optional
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from PyPDF2 import PdfReader, PdfWriter
import pikepdf

from .core import validate_pdf, cleanup_temp_files, logger

async def encrypt_pdf(
    file: UploadFile,
    user_password: str,
    owner_password: Optional[str],
    background_tasks
) -> StreamingResponse:
    """Encrypt a PDF document with user and owner passwords."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            reader = PdfReader(temp_file_path)
            writer = PdfWriter()
            
            if not owner_password:
                owner_password = user_password
                
            for page in reader.pages:
                writer.add_page(page)
                
            writer.encrypt(user_pwd=user_password, owner_pwd=owner_password)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"encrypted_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"PDF encryption error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"PDF encryption failed: {str(e)}")

async def decrypt_pdf(
    file: UploadFile,
    password: str,
    background_tasks
) -> StreamingResponse:
    """Remove password protection from a PDF document."""
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            try:
                pdf = pikepdf.Pdf.open(temp_file_path, password=password)
            except Exception:
                raise HTTPException(status_code=400, detail="Invalid password or the PDF is not encrypted")
                
            output = io.BytesIO()
            pdf.save(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"decrypted_{timestamp}.pdf"
            
            return StreamingResponse(
                output, 
                media_type="application/pdf", 
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"PDF decryption error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"PDF decryption failed: {str(e)}") 