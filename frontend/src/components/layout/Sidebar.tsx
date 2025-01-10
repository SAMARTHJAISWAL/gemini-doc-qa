import { useState } from 'react';
import { FileUpload } from '../FileUpload';
import { DocumentList } from '../DocumentList';
import { Plus, Settings } from 'lucide-react';

interface SidebarProps {
  selectedDocument: string | null;
  onSelectDocument: (doc: string | null) => void;
}

const Sidebar = ({ selectedDocument, onSelectDocument }: SidebarProps) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="w-80 h-full bg-gray-900 text-white flex flex-col flex-shrink-0">
      <div className="p-4 border-b border-gray-700">
        <button
          onClick={() => setIsUploadOpen(true)}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Upload New Document
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <DocumentList 
          onSelect={onSelectDocument}
          selectedDocument={selectedDocument} 
        />
      </div>

      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors text-gray-300 hover:text-white text-sm">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>

      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl">
            <FileUpload onComplete={() => setIsUploadOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;