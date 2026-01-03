
import React, { useState, useMemo } from 'react';
import { Category, Product, CartItem } from './types';
import { 
  PRODUCTS, 
  STORE_NAME, 
  STORE_SUBTITLE, 
  INSTAGRAM_LINK, 
  WHATSAPP_LINK, 
  VIMEO_VIDEO_ID 
} from './constants';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>(Category.CANECAS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cartAnimate, setCartAnimate] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    
    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 500);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Video URL logic to handle mute/unmute
  const videoUrl = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&loop=1&autopause=0&muted=${isMuted ? '1' : '0'}&background=1&quality=1080p`;

  return (
    <div className="min-h-screen bg-rose-50 flex flex-col selection:bg-pink-200">
      
      {/* 1. Header / Hero Section (Headline) */}
      <header className="bg-gradient-to-br from-[#fff5f5] via-[#fff0f3] to-[#ffe4e6] rounded-b-[4rem] shadow-md p-10 text-center relative z-20 border-b-4 border-white/50">
        <div className="relative inline-block mb-4">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-[6px] border-white p-1 shadow-2xl mx-auto overflow-hidden bg-white floating">
            <img 
              src="https://i.imgur.com/uXYNzIU.png" 
              alt="Logo TH Personalizados" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="absolute bottom-0 right-0 bg-pink-500 text-white p-2.5 rounded-full shadow-lg scale-110 border-2 border-white animate-pulse">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>

        <h1 className="text-4xl font-black text-gray-800 tracking-tighter mb-1 drop-shadow-sm">
          {STORE_NAME}
        </h1>
        <p className="text-pink-600 font-black tracking-[0.2em] text-[11px] uppercase mb-4 px-4 py-1.5 rounded-full bg-white/40 inline-block backdrop-blur-sm border border-pink-100 shadow-sm">
          {STORE_SUBTITLE}
        </p>

        <div className="max-w-xs mx-auto mb-8 text-gray-600 font-semibold text-xs italic leading-relaxed opacity-90">
          "Tudo aqui é muito lindo e diferente para você arrasar. Saia do básico e surpreenda a todos!" ✨
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          <a 
            href={INSTAGRAM_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-8 py-3.5 rounded-full font-black text-xs shadow-lg hover:shadow-pink-200 hover:-translate-y-1 transition-all border-2 border-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a 
            href={WHATSAPP_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-black text-xs shadow-lg hover:bg-[#128C7E] hover:-translate-y-1 transition-all border-2 border-white"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.411 0 12.046c0 2.121.54 4.192 1.566 6.041L0 24l6.104-1.602a11.803 11.803 0 005.943 1.604h.005c6.634 0 12.043-5.413 12.048-12.049a11.82 11.82 0 00-3.54-8.412z"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* 2. Intro Video Section - Aumentado e com opção de Som */}
      <section className="max-w-xl mx-auto w-full px-4 -mt-10 mb-14 relative z-30">
        <div className="bg-white p-3 rounded-[3.5rem] shadow-2xl overflow-hidden border-[8px] border-white ring-4 ring-pink-100/30 relative">
          
          {/* Proporção do vídeo ajustada de 16:9 para algo mais robusto 4:3 aprox */}
          <div className="relative pt-[75%] md:pt-[65%] rounded-[2.8rem] shadow-inner bg-pink-50 overflow-hidden">
            <iframe 
              src={videoUrl} 
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title="Apresentação TH Personalizados"
            ></iframe>

            {/* Overlay para clique interativo no som */}
            <div 
              onClick={toggleSound}
              className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center group"
            >
              {isMuted && (
                <div className="bg-pink-500/80 backdrop-blur-sm text-white px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest shadow-2xl animate-bounce group-hover:scale-110 transition-transform">
                  Ativar Som 🔊
                </div>
              )}
              {!isMuted && (
                <div className="absolute top-4 right-4 bg-white/50 backdrop-blur-sm p-2 rounded-full text-pink-500 opacity-0 group-hover:opacity-100 transition-opacity">
                   <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 4.06c0-1.333-1.611-1.999-2.553-1.057L5.432 8.515H2.25c-1.243 0-2.25 1.007-2.25 2.25v2.47c0 1.243 1.007 2.25 2.25 2.25h3.182l5.515 5.511c.942.942 2.553.276 2.553-1.057V4.06zM15.75 12c0-1.503-.81-2.822-2.025-3.54v7.08c1.215-.718 2.025-2.037 2.025-3.54z"/></svg>
                </div>
              )}
            </div>
          </div>

          <div className="py-6 text-center">
            <h2 className="text-pink-600 font-black text-2xl mb-1 drop-shadow-sm uppercase tracking-tighter">Mini Album Pixar</h2>
            <div className="flex justify-center items-center gap-3">
              <span className="h-1 w-8 bg-pink-200 rounded-full"></span>
              <p className="text-pink-400 text-[11px] font-black uppercase tracking-[0.25em] animate-pulse">Toque no vídeo para ouvir ✨</p>
              <span className="h-1 w-8 bg-pink-200 rounded-full"></span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content */}
      <main className="flex-grow w-full px-4 py-4 pb-32 max-w-lg mx-auto">
        
        {/* Category Selector */}
        <div className="sticky top-4 z-40 mb-10 overflow-hidden">
          <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-2xl border-2 border-white/50 flex gap-2 overflow-x-auto no-scrollbar ring-1 ring-pink-100">
            {Object.values(Category).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-7 py-3.5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-pink-500 text-white shadow-xl scale-105 -translate-y-0.5' 
                  : 'bg-white/50 text-pink-300 hover:text-pink-500 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid - 2 columns for mobile */}
        <div className="grid grid-cols-2 gap-5">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
              onImageClick={setSelectedImage}
            />
          ))}
        </div>
      </main>

      {/* Cart Float Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-pink-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 flex items-center justify-center transition-all border-4 border-white ${cartAnimate ? 'animate-bounce' : ''}`}
      >
        <div className="relative">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-5 -right-5 bg-yellow-400 text-pink-800 text-[11px] font-black h-7 w-7 flex items-center justify-center rounded-full shadow-lg border-2 border-white">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* Full Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6 transition-all"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-8 right-8 bg-white text-pink-500 p-3 hover:bg-pink-50 rounded-full shadow-2xl">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Produto ampliado" 
            className="max-w-full max-h-[85vh] object-contain rounded-[3.5rem] shadow-2xl border-4 border-white"
          />
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white p-12 text-center border-t-2 border-pink-50 relative z-10">
        <p className="text-pink-400 font-black text-[11px] tracking-[0.4em] uppercase opacity-80">
          TH Personalizados • 💖 • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default App;
