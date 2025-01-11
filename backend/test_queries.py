import requests
import json

def test_query(question):
    url = "https://gemini-doc-qa.onrender.com/ask"
    params = {
        "document_name": "complex_test.csv",
        "question": question
    }
    
    try:
        response = requests.get(url, params=params)
        if response.status_code == 200:
            print(f"\nQuestion: {question}")
            print("Answer:", json.dumps(response.json(), indent=2))
        else:
            print(f"Error: {response.status_code}", response.json())
    except Exception as e:
        print(f"Error: {str(e)}")

def run_tests():
    questions = [
        "What's the average salary by department?",
        "How does experience correlate with salary?",
        "What's the age distribution across cities?",
        "Compare the salaries in different cities",
        "Who has the most experience in each department?"
    ]
    
    for question in questions:
        test_query(question)

if __name__ == "__main__":
    run_tests()
