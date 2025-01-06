# Document Q&A Application

A web application for uploading documents (XLSX/CSV) and asking AI-powered questions about their content.

## Tech Stack

- Backend: FastAPI, Google Gemini AI, Pandas
- Frontend: React + Vite, TypeScript, Tailwind CSS
- File Support: Excel (.xlsx), CSV

## Features

- Document upload with drag-and-drop
- AI-powered question answering
- Document management
- Interactive Q&A interface
- Question history tracking

## Setup

### Prerequisites
- Python 3.9+
- Node.js 16+
- Gemini API key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate 
pip install -r requirements.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Environment Variables
Create `.env` in backend directory:
```
GEMINI_API_KEY=your_api_key_here
```

## Running Locally

Backend:
```bash
cd backend
uvicorn app.main:app --reload
```

Frontend:
```bash
cd frontend
npm run dev
```

Access: http://localhost:5173

## API Endpoints

- `POST /upload`: Upload document
- `GET /documents`: List documents
- `POST /ask`: Ask questions
- `GET /health`: Health check

## Project Structure

```
doc-qa/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   └── services/
│   └── storage/
└── frontend/
    ├── src/
    │   ├── components/
    │   └── services/
    └── public/
```

## Usage

1. Upload document (.xlsx/.csv)
2. Select document from list
3. Ask questions about content
4. View AI-generated answers

## Development Notes

- Max file size: 30MB
- Supported formats: XLSX, CSV
- Uses Gemini AI for analysis