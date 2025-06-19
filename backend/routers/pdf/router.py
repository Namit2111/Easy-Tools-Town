from fastapi import APIRouter, File, Query, BackgroundTasks, Depends, Body, UploadFile
from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi.responses import JSONResponse

from .core import validate_pdf_extended
from .basic_operations import merge_pdfs, split_pdf, rotate_pdf
from .text_operations import extract_text_from_pdf
from .image_operations import extract_images_from_pdf, images_to_pdf
from .security import encrypt_pdf, decrypt_pdf
from .form_operations import extract_pdf_form_fields, fill_pdf_form_fields
from .metadata import (
    PageLayout,
    PageMode,
    set_pdf_metadata_endpoint,
    set_pdf_viewer_preferences_endpoint
)
from .structure import (
    extract_pdf_outline_structure,
    add_pdf_bookmarks,
    create_pdf_toc,
    add_pdf_page_labels
)
from .optimization import optimize_pdf_file, compress_pdf

router = APIRouter(
    tags=["PDF Operations"],
)

# Health check endpoint
@router.get("/health", summary="Health check endpoint")
async def health_check():
    """Simple health check endpoint to verify the service is running."""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

# Basic operations
@router.post("/merge", summary="Merge multiple PDFs into one")
async def merge_pdfs_endpoint(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(..., description="PDF files to merge")
):
    return await merge_pdfs(files, background_tasks)

@router.post("/split", summary="Split a PDF by page range")
async def split_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to split"),
    start: int = Query(1, ge=1, description="Starting page number (1-indexed)"),
    end: Optional[int] = Query(None, description="Ending page number (inclusive, leave empty for all pages)")
):
    return await split_pdf(file, start, end, background_tasks)

@router.post("/rotate", summary="Rotate PDF pages")
async def rotate_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to rotate"),
    degrees: int = Query(90, description="Rotation angle in degrees (90, 180, 270)"),
    pages: Optional[List[int]] = Query(None, description="Specific pages to rotate (1-indexed, empty for all pages)")
):
    return await rotate_pdf(file, degrees, pages, background_tasks)

# Text operations
@router.post("/extract-text", summary="Extract text from PDF")
async def extract_text_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF to extract text from"),
    page_numbers: Optional[List[int]] = Query(None, description="Specific page numbers to extract (1-indexed, empty for all pages)")
):
    return await extract_text_from_pdf(file, page_numbers, background_tasks)

# Image operations
@router.post("/extract-images", summary="Extract images from PDF")
async def extract_images_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF to extract images from"),
    page_numbers: Optional[List[int]] = Query(None, description="Specific page numbers to extract from (1-indexed, empty for all pages)"),
    resolution: int = Query(150, ge=72, le=600, description="Image extraction resolution (DPI)")
):
    return await extract_images_from_pdf(file, page_numbers, resolution, background_tasks)

@router.post("/images-to-pdf", summary="Convert images to PDF")
async def images_to_pdf_endpoint(
    background_tasks: BackgroundTasks,
    files: List[UploadFile] = File(..., description="Image files to convert"),
    page_size: str = Query("A4", description="Page size (A4, letter)"),
    margin: int = Query(0, ge=0, le=100, description="Margin in points")
):
    return await images_to_pdf(files, page_size, margin, background_tasks)

# Security operations
@router.post("/encrypt", summary="Encrypt PDF with password")
async def encrypt_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to encrypt"),
    user_password: str = Query(..., min_length=4, description="User password for opening"),
    owner_password: Optional[str] = Query(None, min_length=4, description="Owner password for full access (defaults to user password)")
):
    return await encrypt_pdf(file, user_password, owner_password, background_tasks)

@router.post("/decrypt", summary="Decrypt PDF with password")
async def decrypt_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to decrypt"),
    password: str = Query(..., min_length=1, description="Password to decrypt the PDF")
):
    return await decrypt_pdf(file, password, background_tasks)

# Form operations
@router.post("/extract-form", summary="Extract form fields from PDF")
async def extract_form_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to extract form fields from")
):
    return await extract_pdf_form_fields(file, background_tasks)

@router.post("/fill-form", summary="Fill PDF form fields")
async def fill_form_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF form to fill"),
    field_data: Dict[str, str] = Body(..., description="Form field data as key-value pairs")
):
    return await fill_pdf_form_fields(file, field_data, background_tasks)

# Metadata operations
@router.post("/set-metadata", summary="Set PDF metadata")
async def set_metadata_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to update metadata"),
    metadata: Dict[str, str] = Body(..., description="Metadata key-value pairs")
):
    return await set_pdf_metadata_endpoint(file, metadata, background_tasks)

@router.post("/set-viewer-prefs", summary="Set PDF viewer preferences")
async def set_viewer_prefs_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to update viewer preferences"),
    layout: PageLayout = Query(PageLayout.SINGLE_PAGE, description="Page layout setting"),
    mode: PageMode = Query(PageMode.USE_NONE, description="Page mode setting")
):
    return await set_pdf_viewer_preferences_endpoint(file, layout, mode, background_tasks)

# Structure operations
@router.post("/extract-outline", summary="Extract PDF outline/bookmarks")
async def extract_outline_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to extract outline from")
):
    return await extract_pdf_outline_structure(file, background_tasks)

@router.post("/add-bookmarks", summary="Add bookmarks to PDF")
async def add_bookmarks_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to add bookmarks to"),
    bookmarks: List[Dict[str, Any]] = Body(..., description="List of bookmarks to add")
):
    return await add_pdf_bookmarks(file, bookmarks, background_tasks)

@router.post("/create-toc", summary="Create table of contents")
async def create_toc_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to add table of contents to"),
    toc_entries: List[Dict[str, Any]] = Body(..., description="Table of contents entries")
):
    return await create_pdf_toc(file, toc_entries, background_tasks)

@router.post("/add-page-labels", summary="Add page labels")
async def add_page_labels_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to add page labels to"),
    labels: List[Dict[str, Any]] = Body(
        ...,
        description="Page label definitions",
        example=[
            {"start_page": 1, "style": "r", "prefix": "TOC-"},
            {"start_page": 5, "style": "D", "start_at": 1}
        ]
    )
):
    return await add_pdf_page_labels(file, labels, background_tasks)

# Optimization operations
@router.post("/optimize", summary="Optimize PDF file size")
async def optimize_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to optimize"),
    options: Dict[str, Any] = Body(
        default={
            "compress_images": True,
            "image_quality": 80,
            "compress_fonts": True,
            "remove_metadata": False
        },
        description="Optimization options"
    )
):
    return await optimize_pdf_file(file, options, background_tasks)

@router.post("/compress", summary="Compress PDF size")
async def compress_pdf_endpoint(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(..., description="PDF file to compress"),
    quality: int = Query(80, ge=10, le=100, description="Image quality for compression (10-100)")
):
    return await compress_pdf(file, quality, background_tasks)

# Validation endpoint
@router.post("/validate", summary="Validate PDF file")
async def validate_pdf_endpoint(
    file: UploadFile = File(..., description="PDF file to validate")
):
    is_valid, message = validate_pdf_extended(file)
    return JSONResponse(content={
        "is_valid": is_valid,
        "message": message
    })