import io
import tempfile
from datetime import datetime
from typing import Dict
import fitz
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from PyPDF2 import PdfReader, PdfWriter

from .core import validate_pdf, cleanup_temp_files, logger

def extract_form_fields(pdf_path: str) -> Dict[str, Dict]:
    """Extract form fields and their values from a PDF."""
    fields = {}
    try:
        with fitz.open(pdf_path) as doc:
            for page in doc:
                widgets = page.widgets()
                for widget in widgets:
                    fields[widget.field_name] = {
                        "type": widget.field_type,
                        "value": widget.field_value,
                        "flags": widget.field_flags,
                        "rect": widget.rect
                    }
    except Exception as e:
        logger.error(f"Error extracting form fields: {str(e)}")
    return fields

def fill_form_fields(input_path: str, output_path: str, field_data: Dict[str, str]) -> bool:
    """Fill PDF form fields with provided data."""
    try:
        reader = PdfReader(input_path)
        writer = PdfWriter()
        
        if reader.is_encrypted:
            raise ValueError("Cannot fill encrypted PDF form")
        
        writer.append(reader)
        writer.update_page_form_field_values(
            writer.pages[0],  # Update all pages
            field_data
        )
        
        with open(output_path, "wb") as output_file:
            writer.write(output_file)
        return True
    except Exception as e:
        logger.error(f"Error filling form fields: {str(e)}")
        return False

async def extract_pdf_form_fields(
    file: UploadFile,
    background_tasks
) -> JSONResponse:
    """Extract form fields and their values from a PDF document."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            fields = extract_form_fields(temp_file_path)
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content={"form_fields": fields})
    
    except Exception as e:
        logger.error(f"Form field extraction error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"Form field extraction failed: {str(e)}")

async def fill_pdf_form_fields(
    file: UploadFile,
    field_data: Dict[str, str],
    background_tasks
) -> StreamingResponse:
    """Fill PDF form fields with provided data."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_input_path = None
    temp_output_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_input_path = temp_file.name
            
            temp_output_path = f"{temp_input_path}_filled.pdf"
            
            if fill_form_fields(temp_input_path, temp_output_path, field_data):
                with open(temp_output_path, "rb") as f:
                    content = f.read()
                
                background_tasks.add_task(cleanup_temp_files, [temp_input_path, temp_output_path])
                
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                filename = f"filled_{timestamp}.pdf"
                
                return StreamingResponse(
                    io.BytesIO(content),
                    media_type="application/pdf",
                    headers={"Content-Disposition": f"attachment; filename={filename}"}
                )
            else:
                raise HTTPException(status_code=400, detail="Failed to fill form fields")
    
    except Exception as e:
        logger.error(f"Form filling error: {str(e)}")
        cleanup_temp_files([f for f in [temp_input_path, temp_output_path] if f])
        raise HTTPException(status_code=500, detail=f"Form filling failed: {str(e)}")