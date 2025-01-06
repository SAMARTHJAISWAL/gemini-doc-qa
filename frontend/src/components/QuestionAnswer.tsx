import { useState, useEffect } from 'react';
import { api } from '../services/api';

interface Answer {
  question: string;
  answer: string;
  timestamp: Date;
}

export const QuestionAnswer = ({ documentName }: { documentName: string }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const suggestedQuestions = [
    "How many records are in this dataset?",
    "What's the average of the numerical columns?",
    "What are the main patterns in this data?",
    "Summarize the key insights from this document",
  ];

  const handleAskQuestion = async (q: string = question) => {
    if (!q.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await api.askQuestion(documentName, q);
      setAnswers(prev => [{
        question: q,
        answer: result.answer,
        timestamp: new Date()
      }, ...prev]);
      setQuestion('');
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error('Question error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-6">
      {}
      <div className="border-b pb-4">
        <h2 className="text-2xl font-semibold">Ask Questions</h2>
        <p className="text-gray-600">Currently analyzing: {documentName}</p>
      </div>

      {/* question */}
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your question here..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={3}
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={!question.trim() || loading}
            className={`absolute bottom-3 right-3 px-4 py-2 rounded-md text-white
              ${loading || !question.trim() 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </div>

        {/* suggest question */}
        <div className="space-y-2">
          <p className="text-sm text-gray-600 font-medium">Suggested Questions:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, index) => (
              <button
                key={index}
                onClick={() => handleAskQuestion(q)}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
      </div>

      {/* answer history */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Previous Questions & Answers</h3>
        {answers.map((ans, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-start">
              <p className="font-medium text-gray-800">Q: {ans.question}</p>
              <span className="text-xs text-gray-500">
                {ans.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <p className="text-gray-700 pl-4 border-l-2 border-blue-500">
              A: {ans.answer}
            </p>
          </div>
        ))}
        {answers.length === 0 && !loading && (
          <p className="text-gray-500 text-center py-4">
            No questions asked yet. Try asking something!
          </p>
        )}
      </div>
    </div>
  );
};