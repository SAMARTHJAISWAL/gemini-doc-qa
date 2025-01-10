import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';

function App() {
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar
        selectedDocument={selectedDocument}
        onSelectDocument={setSelectedDocument}
      />
      <MainContent selectedDocument={selectedDocument} />
    </div>
  );
}

export default App;