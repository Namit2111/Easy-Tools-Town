import logging
import tempfile
import os
import hashlib
from typing import Tuple, List
from fastapi import UploadFile
import pikepdf
from PyPDF2 import PdfReader

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("pdf_service")

def get_pdf_hash(file_path: str) -> str:
    """Calculate SHA-256 hash of PDF file for comparison."""
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

def repair_pdf(input_path: str, output_path: str) -> bool:
    """Attempt to repair a corrupted PDF file."""
    try:
        pdf = pikepdf.open(input_path, allow_overwriting_input=True)
        pdf.save(output_path)
        return True
    except Exception as e:
        logger.error(f"PDF repair error: {str(e)}")
        return False

def validate_pdf(file: UploadFile) -> bool:
    """Validate if the uploaded file is a PDF."""
    if not file.content_type == "application/pdf":
        return False
    
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            
            reader = PdfReader(temp_file.name)
            if len(reader.pages) < 1:
                return False
            
            file.file.seek(0)
            return True
    except Exception as e:
        logger.error(f"PDF validation error: {str(e)}")
        file.file.seek(0)
        return False
    finally:
        if 'temp_file' in locals():
            os.unlink(temp_file.name)

def validate_pdf_extended(file: UploadFile) -> Tuple[bool, str]:
    """Extended PDF validation with detailed error reporting."""
    if not file.content_type == "application/pdf":
        return False, "File is not a PDF"
    
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            
            reader = PdfReader(temp_file.name)
            if len(reader.pages) < 1:
                return False, "PDF contains no pages"
            
            pdf = pikepdf.open(temp_file.name)
            if pdf.is_encrypted and not pdf.is_pdf:
                return False, "File is an encrypted non-PDF document"
            if pdf.is_repaired:
                return True, "PDF was automatically repaired"
                
            file.file.seek(0)
            return True, "PDF is valid"
    except Exception as e:
        logger.error(f"PDF validation error: {str(e)}")
        file.file.seek(0)
        return False, str(e)
    finally:
        if 'temp_file' in locals():
            os.unlink(temp_file.name)

def cleanup_temp_files(file_paths: List[str]):
    """Clean up temporary files."""
    for file_path in file_paths:
        try:
            if os.path.exists(file_path):
                os.unlink(file_path)
        except Exception as e:
            logger.error(f"Error cleaning up {file_path}: {str(e)}") 