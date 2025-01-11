import google.generativeai as genai
import os

def test_gemini_api():
    try:
        genai.configure(api_key='AIzaSyBB6uVR9kVh7bF_Bbpwk4isjh7un2BuqsY')
        
        for m in genai.list_models():
            print(m.name)
        
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Tell me about Python programming.")
        print("\nAPI Test Response:", response.text)
        return "API is working!"
    except Exception as e:
        return f"API Error: {str(e)}"

if __name__ == "__main__":
    result = test_gemini_api()
    print("\nTest Result:", result)
