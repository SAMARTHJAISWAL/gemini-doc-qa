import { useState, useEffect, useRef } from 'react';
import { api } from '../services/api';
import { Send, Loader2, Bot, User } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "How many records are in this dataset?",
    "What's the average of the numerical columns?",
    "What are the main patterns in this data?",
    "Summarize the key insights from this document",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [answers]);

  const handleAskQuestion = async (q: string = question) => {
    if (!q.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await api.askQuestion(documentName, q);
      setAnswers(prev => [...prev, {
        question: q,
        answer: result.answer,
        timestamp: new Date()
      }]);
      setQuestion('');
    } catch (err) {
      setError('Failed to get answer. Please try again.');
      console.error('Question error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white rounded-tl-xl shadow-lg">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
          {answers.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8 text-blue-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Ask questions about {documentName}
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Get instant answers about your document. Try asking about specific details, patterns, or insights.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {suggestedQuestions.map((q, index) => (
                  <button
                    key={index}
                    onClick={() => handleAskQuestion(q)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full text-sm text-gray-700 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            answers.map((ans, index) => (
              <div key={index} className="space-y-6">
                {/* User Question */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800">{ans.question}</p>
                  </div>
                </div>
                
                {/* AI Answer */}
                <div className="flex gap-4 bg-gray-50 p-6 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 whitespace-pre-wrap">{ans.answer}</p>
                  </div>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              </div>
              <p className="text-gray-500">Thinking...</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto p-4">
          {error && (
            <div className="mb-4 text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask a question about your document..."
              className="w-full p-4 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
              rows={3}
            />
            <button
              onClick={() => handleAskQuestion()}
              disabled={!question.trim() || loading}
              className="absolute right-3 bottom-3 p-2 text-blue-500 hover:bg-blue-50 rounded-full disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};
