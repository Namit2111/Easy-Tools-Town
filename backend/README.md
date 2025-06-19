# EasyToolTown Backend

This is the backend for EasyToolTown, built with FastAPI. It provides multiple tools for PDF, image, file, and text processing via REST APIs.

## Project Structure

```
backend/
├── main.py           # FastAPI app entrypoint
├── settings.py       # App settings using pydantic
├── routers/          # Routers for each tool category
│   ├── __init__.py
│   ├── pdf_tools.py
│   ├── image_tools.py
│   ├── file_tools.py
│   └── text_tools.py
├── requirements.txt  # Python dependencies
└── ...
```

## Available Tools
- **PDF Tools**: Extract text, get metadata
- **Image Tools**: Get image size, convert to grayscale
- **File Tools**: Get file size, get file extension
- **Text Tools**: Word count, character count

## Running the App

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

The API will be available at `http://localhost:8000`.

## Environment Variables
- You can use a `.env` file for settings (see `settings.py`). 