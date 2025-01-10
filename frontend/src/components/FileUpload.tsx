import { useState, useCallback } from "react";
import { api } from "../services/api";
import { Upload, X, FileText } from "lucide-react";

export const FileUpload = ({ onComplete }: { onComplete: () => void }) => {
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
      formData.append("file", file);
      const response = await api.uploadFile(file);

      if (response && response.status === 200) {
        setProgress(100);
        setTimeout(() => {
          onComplete();
        }, 1000);
      } else {
        setError(response?.status || "Upload failed. Please try again.");
      }
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.name.endsWith(".xlsx") || droppedFile.name.endsWith(".csv"))
    ) {
      setFile(droppedFile);
    } else {
      setError("Please upload only .xlsx or .csv files");
    }
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Upload Document</h2>
        <button
          onClick={onComplete}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors
          ${
            file
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
      >
        <input
          type="file"
          accept=".xlsx,.csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="text-gray-500">
            <p className="mb-2">
              Drag and drop your file here or click to browse
            </p>
            <p className="text-sm">Supported formats: XLSX, CSV</p>
          </div>
        </label>

        {file && (
          <div className="mt-4 flex items-center gap-2 justify-center text-gray-700">
            <FileText className="w-4 h-4" />
            <span>{file.name}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-200">
          {typeof error === "string" ? error : `Error: ${error}`}
        </div>
      )}

      {progress > 0 && (
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600 flex justify-between">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`mt-6 w-full py-2.5 px-4 rounded-lg text-white font-medium transition-colors
          ${
            !file || loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
      >
        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  );
};
