from fastapi import FastAPI, File, UploadFile, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import google.generativeai as genai
import os
import shutil
from typing import Union

app = FastAPI(
    title="Document Q&A API",
    description="API for document upload and question answering",
    version="1.0.0"
)
GEMINI_API_KEY = 'AIzaSyBB6uVR9kVh7bF_Bbpwk4isjh7un2BuqsY'
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-pro')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
UPLOAD_DIR = "storage/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

async def analyze_with_gemini(data_context: str, question: str) -> str:
    try:
        prompt = f"""
        Given this dataset:
        {data_context}

        Please answer this question: {question}

        Provide a clear, concise answer based only on the data shown above.
        Format any numbers or statistics clearly.
        """
        
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        if not file.filename.endswith(('.xlsx', '.csv')):
            raise HTTPException(
                status_code=400,
                detail="Only .xlsx and .csv files are allowed"
            )
        
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {
            "filename": file.filename,
            "status": "File uploaded successfully"
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/documents")
async def list_documents():
    try:
        files = os.listdir(UPLOAD_DIR)
        documents = [f for f in files if f.endswith(('.xlsx', '.csv'))]
        return {
            "documents": documents,
            "count": len(documents)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ask")
@app.get("/ask")
async def ask_question(
    document_name: str = Query(..., description="Name of the document to query"),
    question: str = Query(..., description="Question to ask about the document")
):
    try:
        file_path = os.path.join(UPLOAD_DIR, document_name)
        if not os.path.exists(file_path):
            raise HTTPException(
                status_code=404,
                detail=f"Document '{document_name}' not found"
            )
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)
        data_context = df.to_string()
        answer = await analyze_with_gemini(data_context, question)
        
        return {
            "document": document_name,
            "question": question,
            "answer": answer,
            "rows": len(df),
            "columns": list(df.columns)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/")
async def root():
    return {
        "message": "Welcome to Document Q&A API",
        "endpoints": {
            "upload": "/upload",
            "documents": "/documents",
            "ask": "/ask",
            "health": "/health"
        }
    }
