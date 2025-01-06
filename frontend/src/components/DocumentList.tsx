import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const DocumentList = ({ onSelect }: { onSelect: (name: string) => void }) => {
  const [documents, setDocuments] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const result = await api.getDocuments();
      setDocuments(result.documents);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Documents</h2>
      {loading ? (
        <p>Loading documents...</p>
      ) : documents.length === 0 ? (
        <p>No documents uploaded yet.</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li 
              key={doc}
              onClick={() => onSelect(doc)}
              className="cursor-pointer p-2 hover:bg-gray-50 rounded-md"
            >
              {doc}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};