import React from 'react';
import { useNavigate } from 'react-router-dom';

const Compres = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/pricecomp'); // Navigate to the ComparePrices page
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
      {/* Product Description */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Product Description</h2>
        <p className="text-gray-600 mt-2">
          This is a sample description of the product. It provides details about the features, benefits, and specifications.
          The product is designed to offer the best value and high performance.
        </p>
      </div>

      {/* Button to Navigate */}
      <div className="text-center mt-6">
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        >
          Compare Prices
        </button>
      </div>
    </div>
  );
};

export default Compres;
