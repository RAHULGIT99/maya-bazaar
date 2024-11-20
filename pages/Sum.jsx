import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import navigate from react-router-dom

const Sum = () => {
  const [inputText, setInputText] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSummarize = () => {
    const user_input = inputText.trim(); // Get user input
    if (user_input === "") {
      alert("Please enter something in the search bar!"); // Basic validation
      return;
    }

    // Split the input for URLs (assuming user enters two URLs separated by a space)
    const [amazon_url, flipkart_url] = user_input.split(/\s+/);

    if (!amazon_url || !flipkart_url) {
      alert("Please enter both Amazon and Flipkart URLs.");
      return;
    }

    // Create JSON payload
    const requestBody = {
      amazon_url,
      flipkart_url,
    };

    // Navigate to the loading page with the JSON payload
    navigate('/load_sum', { state: { requestBody } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Product URL Summarizer
            </h1>
            
            <div className="space-y-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter Amazon and Flipkart product URLs here..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700 text-sm"
              ></textarea>
              
              <div className="flex justify-center">
                <button
                  onClick={handleSummarize}
                  disabled={!inputText.trim()}
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Summarize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sum;
