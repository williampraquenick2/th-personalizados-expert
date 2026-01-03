
import React, { useState } from 'react';
import { CartItem } from '../types';
import { WHATSAPP_LINK, SPECIAL_OFFER_PRODUCT } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const [showOffer, setShowOffer] = useState(false);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const generateWhatsAppMessage = (includeOffer = false) => {
    let message = `*Olá, TH Personalizados! Gostaria de fazer um pedido:*\n\n`;
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });

    let finalTotal = total;
    if (includeOffer) {
      message += `\n*✨ OFERTA ESPECIAL ADICIONADA:*\n• 1x ${SPECIAL_OFFER_PRODUCT.name} - R$ ${SPECIAL_OFFER_PRODUCT.price.toFixed(2)}\n`;
      finalTotal += SPECIAL_OFFER_PRODUCT.price;
    }

    message += `\n*Total do Pedido: R$ ${finalTotal.toFixed(2)}*`;
    
    const url = new URL(WHATSAPP_LINK);
    url.searchParams.set('text', message);
    window.open(url.toString(), '_blank');
  };

  const handleFinalize = () => {
    if (items.length === 0) return;
    setShowOffer(true);
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 bg-pink-500 text-white flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              Meu Carrinho
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-pink-600 rounded-full transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-pink-200 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <p className="text-gray-500 font-medium">Seu carrinho está vazio.</p>
                <button onClick={onClose} className="mt-4 text-pink-500 font-bold underline">Começar a comprar</button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                  <div className="flex-grow">
                    <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-pink-600 font-bold">R$ {item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-pink-500"
                      >
                        -
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full text-pink-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-600 font-medium">Total do pedido:</span>
              <span className="text-3xl font-bold text-pink-600">R$ {total.toFixed(2).replace('.', ',')}</span>
            </div>
            <button 
              disabled={items.length === 0}
              onClick={handleFinalize}
              className={`w-full py-4 rounded-full font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95 ${items.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600 text-white'}`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411 0 12.046c0 2.121.54 4.192 1.566 6.041L0 24l6.104-1.602a11.803 11.803 0 005.943 1.604h.005c6.634 0 12.043-5.413 12.048-12.049a11.82 11.82 0 00-3.54-8.412z"/></svg>
              Enviar Pedido via WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Special Offer Modal */}
      {showOffer && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-pink-900/80 backdrop-blur-md" onClick={() => setShowOffer(false)}></div>
          <div className="relative bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden animate-bounce-in border-4 border-yellow-400">
            <div className="bg-yellow-400 p-4 text-center">
              <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">Oferta Limitada!</span>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-2">ESPERE! VOCÊ VIU ISSO? 😍</h3>
              <p className="text-gray-600 mb-6">Que tal aproveitar e levar esse clássico para completar seu kit?</p>
              
              <div className="flex flex-col items-center gap-4 bg-pink-50 rounded-3xl p-6 border-2 border-pink-100 mb-8">
                <img src={SPECIAL_OFFER_PRODUCT.image} alt="Oferta" className="w-48 h-48 object-contain drop-shadow-xl" />
                <div>
                  <h4 className="font-bold text-gray-800 leading-tight">{SPECIAL_OFFER_PRODUCT.name}</h4>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <span className="text-gray-400 line-through text-lg">R$ 41,00</span>
                    <span className="text-3xl font-black text-pink-600">R$ {SPECIAL_OFFER_PRODUCT.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <button 
                  onClick={() => {
                    generateWhatsAppMessage(true);
                    setShowOffer(false);
                  }}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white font-black py-5 rounded-2xl shadow-xl transition-all transform hover:scale-105 active:scale-95 text-lg"
                >
                  SIM, APROVEITAR OFERTA! ✨
                </button>
                <button 
                  onClick={() => {
                    generateWhatsAppMessage(false);
                    setShowOffer(false);
                  }}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-bold py-4 rounded-2xl transition-all"
                >
                  Não, apenas finalizar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
