import io
import tempfile
from datetime import datetime
from typing import Dict, Any
from enum import Enum
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from PyPDF2 import PdfReader, PdfWriter
from PyPDF2.generic import NameObject

from .core import validate_pdf, cleanup_temp_files, logger

class PageLayout(str, Enum):
    SINGLE_PAGE = "single-page"
    ONE_COLUMN = "one-column"
    TWO_COLUMN_LEFT = "two-column-left"
    TWO_COLUMN_RIGHT = "two-column-right"
    TWO_PAGE_LEFT = "two-page-left"
    TWO_PAGE_RIGHT = "two-page-right"

class PageMode(str, Enum):
    USE_NONE = "use-none"
    USE_OUTLINES = "use-outlines"
    USE_THUMBS = "use-thumbs"
    FULL_SCREEN = "full-screen"
    USE_OC = "use-oc"
    USE_ATTACHMENTS = "use-attachments"

def set_pdf_metadata(writer: PdfWriter, metadata: Dict[str, str]):
    """Set PDF document metadata."""
    writer.add_metadata(metadata)

def set_pdf_viewer_preferences(writer: PdfWriter, layout: PageLayout, mode: PageMode):
    """Set PDF viewer preferences."""
    catalog = writer._root_object
    catalog.update({
        NameObject("/PageLayout"): NameObject(f"/{layout.value}"),
        NameObject("/PageMode"): NameObject(f"/{mode.value}")
    })

async def set_pdf_metadata_endpoint(
    file: UploadFile,
    metadata: Dict[str, str],
    background_tasks
) -> StreamingResponse:
    """Set or update PDF document metadata."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_input_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_input_path = temp_file.name
            
            reader = PdfReader(temp_input_path)
            writer = PdfWriter()
            writer.append_pages_from_reader(reader)
            set_pdf_metadata(writer, metadata)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_input_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"metadata_updated_{timestamp}.pdf"
            
            return StreamingResponse(
                output,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"Metadata update error: {str(e)}")
        if temp_input_path:
            cleanup_temp_files([temp_input_path])
        raise HTTPException(status_code=500, detail=f"Metadata update failed: {str(e)}")

async def set_pdf_viewer_preferences_endpoint(
    file: UploadFile,
    layout: PageLayout,
    mode: PageMode,
    background_tasks
) -> StreamingResponse:
    """Set PDF viewer preferences for layout and mode."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_input_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_input_path = temp_file.name
            
            reader = PdfReader(temp_input_path)
            writer = PdfWriter()
            writer.append_pages_from_reader(reader)
            set_pdf_viewer_preferences(writer, layout, mode)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_input_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"viewer_prefs_updated_{timestamp}.pdf"
            
            return StreamingResponse(
                output,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"Viewer preferences update error: {str(e)}")
        if temp_input_path:
            cleanup_temp_files([temp_input_path])
        raise HTTPException(status_code=500, detail=f"Viewer preferences update failed: {str(e)}") 