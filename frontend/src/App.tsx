import { useState } from 'react';
import { FileUpload } from './components/FileUpload';
import { QuestionAnswer } from './components/QuestionAnswer';
import { DocumentList } from './components/DocumentList';

function App() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8">Document Q&A</h1>
        
        <div className="grid gap-6">
          {/* Upload */}
          <div className="grid md:grid-cols-2 gap-6">
            <FileUpload />
            <DocumentList onSelect={setSelectedDocument} />
          </div>

          {/* qna */}
          {selectedDocument && (
            <QuestionAnswer documentName={selectedDocument} />
          )}
          
          {!selectedDocument && (
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">
                Please select a document to start asking questions
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;