import requests
import json
from typing import Dict, Any

class APITester:
    def __init__(self, base_url: str = "https://gemini-doc-qa.onrender.com"):
        self.base_url = base_url

    def test_health(self) -> Dict[str, Any]:
        try:
            response = requests.get(f"{self.base_url}/health")
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    def test_documents(self) -> Dict[str, Any]:
        try:
            response = requests.get(f"{self.base_url}/documents")
            return response.json()
        except Exception as e:
            return {"error": str(e)}

    def test_qa(self, document_name: str, question: str) -> Dict[str, Any]:
        try:
            params = {
                "document_name": document_name,
                "question": question
            }
            response = requests.post(f"{self.base_url}/ask", params=params)
            return response.json()
        except Exception as e:
            return {"error": str(e)}

def run_tests():
    tester = APITester()
    
    print("\n=== Health Check ===")
    health_result = tester.test_health()
    print(json.dumps(health_result, indent=2))

    print("\n=== Documents List ===")
    docs_result = tester.test_documents()
    print(json.dumps(docs_result, indent=2))
    print("\n=== Q&A Test ===")
    qa_result = tester.test_qa(
        document_name="test.csv",
        question="How many people are in the dataset?"
    )
    print(json.dumps(qa_result, indent=2))

if __name__ == "__main__":
    run_tests()
