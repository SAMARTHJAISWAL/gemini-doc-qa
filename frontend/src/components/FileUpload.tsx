import { useState, useCallback } from 'react';
import { api } from '../services/api';

export const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.uploadFile(file);
      
      if (response && response.status === 200) {
        setProgress(100);
        alert('Upload successful!');
        setFile(null);
        setProgress(0);
      } else {
        alert('Upload failed. Please try again.');
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.xlsx') || droppedFile.name.endsWith('.csv'))) {
      setFile(droppedFile);
    } else {
      setError('Please upload only .xlsx or .csv files');
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
      
      {/* Drag & Drop */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
      >
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-gray-500">
            <p className="mb-2">Drag and drop your file here or click to browse</p>
            <p className="text-sm">Supported formats: XLSX, CSV</p>
          </div>
        </label>
        
        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">Selected file: {file.name}</p>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-500 text-sm">
          {error}
        </div>
      )}

      {/* Progress */}
      {progress > 0 && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`mt-4 w-full py-2 px-4 rounded-md text-white font-medium
          ${!file || loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
          }`}
      >
        {loading ? 'Uploading...' : 'Upload Document'}
      </button>
    </div>
  );
};
