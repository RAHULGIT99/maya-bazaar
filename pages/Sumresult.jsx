import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom"; // Import useLocation
import { X, Edit3, ChevronLeft } from 'lucide-react';

const Sumresult = () => {
  const location = useLocation(); 
  const receivedMessage = location.state?.result || "No message received";  // Get received message

  const squareCards = [
    {
      id: 1,
      image: 'ecom/amazon.webp',
      title: 'Card 1',
      description: 'Brief description for Card 1',
      expandedContent: 'Detailed information for Card 1 when expanded. This could be much longer content.'
    },
    {
      id: 2,
      image: 'ecom/flipkart.webp',
      title: 'Card 2',
      description: 'Brief description for Card 2',
      expandedContent: 'Detailed information for Card 2 when expanded. This could be much longer content.'
    },
    {
      id: 3,
      image: 'ecom/croma.png',
      title: 'Card 3',
      description: 'Brief description for Card 3',
      expandedContent: 'Detailed information for Card 3 when expanded. This could be much longer content.'
    },
    {
      id: 4,
      image: 'ecom/reliance.png',
      title: 'Card 4',
      description: 'Brief description for Card 4',
      expandedContent: 'Detailed information for Card 4 when expanded. This could be much longer content.'
    },
    {
      id: 5,
      image: 'ecom/ajio.jpg',
      title: 'Card 5',
      description: 'Brief description for Card 5',
      expandedContent: 'Detailed information for Card 5 when expanded. This could be much longer content.'
    },
    {
      id: 6,
      image: 'ecom/myntra.jpg',
      title: 'Card 6',
      description: 'Brief description for Card 6',
      expandedContent: 'Detailed information for Card 6 when expanded. This could be much longer content.'
    }
  ];

  const rectangularCards = [
    {
      id: 'rect1',
      title: 'Rectangular Card 1',
      description: 'Brief description for rectangular card 1',
      expandedContent: 'Detailed information for rectangular card 1 when expanded.'
    },
    {
      id: 'rect2',
      title: 'Rectangular Card 2',
      description: 'Brief description for rectangular card 2',
      expandedContent: 'Detailed information for rectangular card 2 when expanded.'
    }
  ];

  const [expandedCard, setExpandedCard] = useState(null);
  const [images, setImages] = useState({});

  const handleImageUpdate = (cardId, newImage) => {
    setImages(prev => ({
      ...prev,
      [cardId]: newImage
    }));
  };

  const renderSquareCard = (card) => {
    const currentImage = images[card.id] || card.image;
  
    return (
      <div
        key={card.id}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
        onClick={() => setExpandedCard(card.id)}
      >
        <div className="h-full flex flex-col group">
          <div className="h-32 w-full flex justify-center items-center overflow-hidden bg-gray-200"> {/* Added bg-gray-200 */}
            <img
              src={currentImage}
              alt={`Image of ${card.title}`}
              className="w-24 h-24 object-cover rounded-md"
              onError={(e) => {
                e.target.src = "/api/placeholder/400/400"; // Fallback placeholder
                e.target.alt = "Image not found";
              }}
            />
          </div>
          <div className="p-4 flex-1">
            <h3 className="font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.description}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderRectangularCard = (card) => {
    return (
      <div
        key={card.id}
        className="bg-white rounded-lg shadow-md cursor-pointer h-24 transition-all duration-300 hover:shadow-lg"
        onClick={() => setExpandedCard(card.id)}
      >
        <div className="p-4 h-full flex flex-col justify-center">
          <h3 className="font-semibold mb-1">{card.title}</h3>
          <p className="text-sm text-gray-600 truncate">{card.description}</p>
        </div>
      </div>
    );
  };

  // Expanded overlay component
  const ExpandedOverlay = ({ card, onClose }) => {
    const currentImage = images[card.id] || card.image;
    
    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        <div className="absolute inset-4 md:inset-8 bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="h-full flex flex-col">
            <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex items-center justify-between">
              <button 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                onClick={onClose}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                <span className="font-medium">Back</span>
              </button>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={onClose}
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">{card.title}</h2>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="relative group">
                    <img 
                      src={currentImage} 
                      alt={card.title}
                      className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="prose max-w-none">
                      <p className="text-gray-600 leading-relaxed">{card.expandedContent}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Split cards into rows
  const topRow = squareCards.slice(0, 3);
  const bottomRow = squareCards.slice(3, 6);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Display the received message */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Received Message:</h2>
          <p className="text-gray-600">{receivedMessage}</p>
        </div>

        {/* Fixed 3x2 grid layout */}
        <div className="space-y-6 mb-8">
          {/* Top row */}
          <div className="grid grid-cols-3 gap-6">
            {topRow.map(renderSquareCard)}
          </div>
          {/* Bottom row */}
          <div className="grid grid-cols-3 gap-6">
            {bottomRow.map(renderSquareCard)}
          </div>
        </div>

        {/* Rectangular cards */}
        <div className="space-y-4">
          {rectangularCards.map(renderRectangularCard)}
        </div>

        {/* Expanded card overlay */}
        {expandedCard && (
          <ExpandedOverlay 
            card={[...squareCards, ...rectangularCards].find(c => c.id === expandedCard)} 
            onClose={() => setExpandedCard(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Sumresult;
