import axios from 'axios';

const API_URL = 'https://gemini-doc-qa.onrender.com';

export const api = {
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(`${API_URL}/upload`, formData);
    return response.data;
  },

  askQuestion: async (documentName: string, question: string) => {
    const response = await axios.get(`${API_URL}/ask`, {
      params: { document_name: documentName, question }
    });
    return response.data;
  },
  getDocuments: async () => {
    const response = await axios.get(`${API_URL}/documents`);
    return response.data;
  }
};