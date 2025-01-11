import requests
import sys

def test_upload():
    try:
        health_response = requests.get('https://gemini-doc-qa.onrender.com/health')
        print("Server health check:", health_response.json())

        url = 'https://gemini-doc-qa.onrender.com/upload'
        files = {'file': open('test.csv', 'rb')}
        response = requests.post(url, files=files)
        print("Upload Response:", response.json())

        docs_response = requests.get('https://gemini-doc-qa.onrender.com/documents')
        print("Documents list:", docs_response.json())

    except requests.exceptions.ConnectionError:
        print("Error: Could not connect to server. Make sure server is running on https://gemini-doc-qa.onrender.com")
    except FileNotFoundError:
        print("Error: test.csv not found in current directory")
    except Exception as e:
        print(f"Error occurred: {str(e)}")

if __name__ == "__main__":
    test_upload()
