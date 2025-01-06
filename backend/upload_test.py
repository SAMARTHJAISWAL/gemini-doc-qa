import requests

def upload_file():
    url = 'http://localhost:8000/upload'
    files = {'file': open('complex_test.csv', 'rb')}
    
    try:
        response = requests.post(url, files=files)
        print("Upload Response:", response.json())
    except Exception as e:
        print("Upload Error:", str(e))

if __name__ == "__main__":
    upload_file()
