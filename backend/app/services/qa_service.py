import google.generativeai as genai
from app.core.config import settings
import pandas as pd

class QAService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')

    async def process_document(self, file_path: str) -> str:
        try:
            if file_path.endswith('.csv'):
                df = pd.read_csv(file_path)
            else:
                df = pd.read_excel(file_path)
            return df.to_string()
        except Exception as e:
            raise Exception(f"Error processing document: {str(e)}")

    async def get_answer(self, document_path: str, question: str) -> str:
        try:
            document_content = await self.process_document(document_path)
            
            prompt = f"""
            Based on this document content:
            {document_content}

            Please answer this question:
            {question}
            """
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error getting answer: {str(e)}")
