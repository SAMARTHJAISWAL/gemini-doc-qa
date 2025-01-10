import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { FileText } from 'lucide-react';

interface DocumentListProps {
  onSelect: (name: string) => void;
  selectedDocument: string | null;
}

export const DocumentList = ({ onSelect, selectedDocument }: DocumentListProps) => {
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

  if (loading) {
    return (
      <div className="p-4 text-gray-400">Loading documents...</div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="p-4 text-gray-400">No documents uploaded yet.</div>
    );
  }

  return (
    <div className="py-2">
      {documents.map((doc) => (
        <button
          key={doc}
          onClick={() => onSelect(doc)}
          className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-800 transition-colors
            ${selectedDocument === doc ? 'bg-gray-800 text-white' : 'text-gray-300'}`}
        >
          <FileText className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{doc}</span>
        </button>
      ))}
    </div>
  );
};