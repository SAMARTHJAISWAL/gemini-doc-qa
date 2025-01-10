import { FileText } from 'lucide-react';
import { QuestionAnswer } from '../QuestionAnswer';

interface MainContentProps {
  selectedDocument: string | null;
}

const MainContent = ({ selectedDocument }: MainContentProps) => {
  return (
    <div className="flex-1 flex flex-col">
      {selectedDocument ? (
        <QuestionAnswer documentName={selectedDocument} />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
              Select a document to start
            </h2>
            <p className="text-gray-500">
              Choose a document from the sidebar or upload a new one
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;