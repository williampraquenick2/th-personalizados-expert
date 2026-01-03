
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onImageClick: (image: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onImageClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setShowFeedback(true);
    setTimeout(() => setShowFeedback(false), 2000);
  };

  return (
    <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-pink-100 flex flex-col relative group transition-all duration-300 active:scale-95">
      {/* Feedback Overlay */}
      {showFeedback && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-pink-400/90 backdrop-blur-sm animate-fade-in transition-all p-2">
          <div className="text-center text-white">
            <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
            <p className="font-bold text-xs uppercase tracking-tighter">No Carrinho!</p>
          </div>
        </div>
      )}

      {/* Image Section */}
      <div 
        className="relative aspect-square overflow-hidden cursor-zoom-in bg-pink-50"
        onClick={() => onImageClick(product.image)}
      >
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm text-pink-500 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm border border-pink-100">
          R$ {product.price.toFixed(2).replace('.', ',')}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-gray-700 font-bold text-xs mb-3 line-clamp-2 h-8 leading-tight">
          {product.name}
        </h3>

        <div className="mt-auto space-y-2">
          {/* Quantity Selector - Smaller for mobile */}
          <div className="flex items-center justify-between bg-pink-50 rounded-full p-0.5 border border-pink-100">
            <button 
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="w-7 h-7 flex items-center justify-center rounded-full text-pink-500 hover:bg-pink-100"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4" /></svg>
            </button>
            <span className="text-xs font-black text-pink-600">{quantity}</span>
            <button 
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-7 h-7 flex items-center justify-center rounded-full text-pink-500 hover:bg-pink-100"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>

          {/* Add Button - Smaller for mobile */}
          <button 
            onClick={handleAdd}
            className="w-full bg-pink-400 hover:bg-pink-500 text-white font-bold py-2 px-2 rounded-full flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider shadow-md transition-all active:scale-90"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
