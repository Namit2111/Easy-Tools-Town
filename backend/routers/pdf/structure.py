import io
import tempfile
from datetime import datetime
from typing import List, Dict, Any
import fitz
from fastapi import UploadFile, HTTPException
from fastapi.responses import StreamingResponse, JSONResponse
from PyPDF2 import PdfReader, PdfWriter
from PyPDF2.generic import NameObject, createStringObject, ArrayObject
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from .core import validate_pdf, cleanup_temp_files, logger

def extract_pdf_outline(pdf_path: str) -> List[Dict[str, Any]]:
    """Extract PDF outline/bookmarks structure."""
    outline = []
    try:
        with fitz.open(pdf_path) as doc:
            toc = doc.get_toc()
            for level, title, page in toc:
                outline.append({
                    "level": level,
                    "title": title,
                    "page": page
                })
    except Exception as e:
        logger.error(f"Error extracting outline: {str(e)}")
    return outline

def add_bookmark(writer: PdfWriter, title: str, page_number: int, parent=None, color=(0, 0, 0)):
    """Add a bookmark to the PDF document."""
    page_index = page_number - 1
    if page_index < 0 or page_index >= len(writer.pages):
        raise ValueError(f"Invalid page number: {page_number}")
    
    outline_item = writer.add_outline_item(
        title,
        page_number=page_index,
        parent=parent,
        color=color
    )
    return outline_item

def add_page_labels(writer: PdfWriter, labels: List[Dict[str, Any]]):
    """Add page labels to the PDF document."""
    catalog = writer._root_object
    nums = ArrayObject()
    
    for label in labels:
        page_index = label.get("start_page", 1) - 1
        nums.append(page_index)
        
        label_dict = {
            NameObject("/S"): NameObject(f"/{label.get('style', 'D')}"),
        }
        
        if "prefix" in label:
            label_dict[NameObject("/P")] = createStringObject(label["prefix"])
        if "start_at" in label:
            label_dict[NameObject("/St")] = label["start_at"]
            
        nums.append(label_dict)
    
    page_labels = {NameObject("/Nums"): nums}
    catalog[NameObject("/PageLabels")] = page_labels

def create_table_of_contents(writer: PdfWriter, toc_entries: List[Dict[str, Any]]):
    """Create a table of contents page."""
    packet = io.BytesIO()
    can = canvas.Canvas(packet, pagesize=letter)
    
    can.setFont("Helvetica-Bold", 16)
    can.drawString(72, letter[1] - 72, "Table of Contents")
    
    y = letter[1] - 100
    can.setFont("Helvetica", 12)
    for entry in toc_entries:
        title = entry["title"]
        page = entry["page"]
        level = entry.get("level", 0)
        
        x = 72 + (level * 20)
        
        can.drawString(x, y, f"{title}")
        can.drawString(500, y, str(page))
        
        dots_width = 400 - can.stringWidth(title, "Helvetica", 12)
        dots = ". " * int(dots_width / can.stringWidth(". ", "Helvetica", 12))
        can.drawString(x + can.stringWidth(title, "Helvetica", 12), y, dots)
        
        y -= 20
        if y < 72:
            can.showPage()
            y = letter[1] - 100
            can.setFont("Helvetica", 12)
    
    can.save()
    
    packet.seek(0)
    toc_pdf = PdfReader(packet)
    writer.insert_page(toc_pdf.pages[0], 0)

async def extract_pdf_outline_structure(
    file: UploadFile,
    background_tasks
) -> JSONResponse:
    """Extract the outline/bookmarks structure from a PDF document."""
    if not validate_pdf(file):
        raise HTTPException(status_code=400, detail="Invalid PDF file")
    
    temp_file_path = None
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(file.file.read())
            temp_file.flush()
            temp_file_path = temp_file.name
            
            outline = extract_pdf_outline(temp_file_path)
            
            background_tasks.add_task(cleanup_temp_files, [temp_file_path])
            
            return JSONResponse(content={"outline": outline})
    
    except Exception as e:
        logger.error(f"Outline extraction error: {str(e)}")
        if temp_file_path:
            cleanup_temp_files([temp_file_path])
        raise HTTPException(status_code=500, detail=f"Outline extraction failed: {str(e)}")

async def add_pdf_bookmarks(
    file: UploadFile,
    bookmarks: List[Dict[str, Any]],
    background_tasks
) -> StreamingResponse:
    """Add bookmarks/outline items to a PDF document."""
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
            
            bookmark_dict = {}
            
            for bookmark in bookmarks:
                title = bookmark["title"]
                page = bookmark["page"]
                parent_title = bookmark.get("parent_title")
                color = bookmark.get("color", [0, 0, 0])
                
                parent = bookmark_dict.get(parent_title) if parent_title else None
                bookmark_obj = add_bookmark(writer, title, page, parent, color)
                bookmark_dict[title] = bookmark_obj
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_input_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"bookmarks_added_{timestamp}.pdf"
            
            return StreamingResponse(
                output,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"Bookmark addition error: {str(e)}")
        if temp_input_path:
            cleanup_temp_files([temp_input_path])
        raise HTTPException(status_code=500, detail=f"Bookmark addition failed: {str(e)}")

async def create_pdf_toc(
    file: UploadFile,
    toc_entries: List[Dict[str, Any]],
    background_tasks
) -> StreamingResponse:
    """Create and add a table of contents page to a PDF document."""
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
            create_table_of_contents(writer, toc_entries)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_input_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"toc_added_{timestamp}.pdf"
            
            return StreamingResponse(
                output,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"TOC creation error: {str(e)}")
        if temp_input_path:
            cleanup_temp_files([temp_input_path])
        raise HTTPException(status_code=500, detail=f"TOC creation failed: {str(e)}")

async def add_pdf_page_labels(
    file: UploadFile,
    labels: List[Dict[str, Any]],
    background_tasks
) -> StreamingResponse:
    """Add page labels/numbers with different styles to a PDF document."""
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
            add_page_labels(writer, labels)
            
            output = io.BytesIO()
            writer.write(output)
            output.seek(0)
            
            background_tasks.add_task(cleanup_temp_files, [temp_input_path])
            
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"page_labels_added_{timestamp}.pdf"
            
            return StreamingResponse(
                output,
                media_type="application/pdf",
                headers={"Content-Disposition": f"attachment; filename={filename}"}
            )
    
    except Exception as e:
        logger.error(f"Page label addition error: {str(e)}")
        if temp_input_path:
            cleanup_temp_files([temp_input_path])
        raise HTTPException(status_code=500, detail=f"Page label addition failed: {str(e)}")