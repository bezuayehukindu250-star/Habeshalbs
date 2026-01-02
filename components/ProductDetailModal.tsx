
import React from 'react';
import { X, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { Product, Language, Translation } from '../types';

interface Props {
  product: Product;
  lang: Language;
  t: Translation;
  onClose: () => void;
  onBuy: (p: Product) => void;
}

const ProductDetailModal: React.FC<Props> = ({ product, lang, t, onClose, onBuy }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-white w-full max-w-4xl rounded-none md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-full md:h-auto md:max-h-[90vh]">
        
        {/* Header (Mobile Only) */}
        <div className="md:hidden flex justify-between items-center p-4 border-b bg-white sticky top-0 z-10">
           <h3 className="font-black text-[#0E2A21] serif truncate pr-4">
             {lang === 'en' ? product.name : product.nameAm}
           </h3>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
             <X size={20} />
           </button>
        </div>

        {/* Left: Image */}
        <div className="w-full md:w-1/2 h-72 md:h-auto bg-[#FCFBF4] shrink-0">
          <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 p-6 md:p-12 overflow-y-auto flex flex-col bg-white">
          <div className="hidden md:flex justify-between items-start mb-6">
            <div>
              <span className="bg-[#0E2A21] text-[#FBB03B] text-[10px] font-black uppercase px-4 py-2 rounded-full mb-4 inline-block tracking-widest">
                {product.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0E2A21] serif leading-tight">
                {lang === 'en' ? product.name : product.nameAm}
              </h2>
            </div>
            <button onClick={onClose} className="p-4 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="md:hidden mb-4">
             <span className="bg-[#0E2A21] text-[#FBB03B] text-[8px] font-black uppercase px-3 py-1.5 rounded-full inline-block tracking-widest mb-2">
                {product.category}
             </span>
          </div>

          <div className="flex items-center space-x-2 text-amber-600 font-black mb-6">
            <Tag size={20} />
            <span className="text-2xl md:text-3xl">{product.price} ETB</span>
          </div>

          <div className="space-y-6 flex-1">
            <div className="bg-[#FCFBF4] p-5 md:p-6 rounded-2xl border border-gray-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{t.productDetails}</h4>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                {lang === 'en' ? product.description : product.descriptionAm}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 block mb-1">Available Sizes</span>
                <p className="font-bold text-xs md:text-sm text-[#0E2A21]">{product.sizes.join(', ')}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <span className="text-[8px] md:text-[10px] font-black uppercase text-gray-400 block mb-1">Heritage Colors</span>
                <p className="font-bold text-xs md:text-sm text-[#0E2A21]">{product.colors.join(', ')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-green-600 pb-4 md:pb-0">
              <ShieldCheck size={20} />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-tight">Authentic Hand-woven Fabric</span>
            </div>
          </div>

          <div className="mt-auto pt-6 sticky bottom-0 bg-white border-t md:border-t-0 pb-4 md:pb-0">
            <button 
              onClick={() => { onClose(); onBuy(product); }}
              className="w-full bg-[#0E2A21] hover:bg-[#8B0000] text-white font-black py-5 rounded-2xl md:rounded-3xl shadow-xl transition-all flex items-center justify-center space-x-3 uppercase text-xs md:text-sm tracking-widest active:scale-95"
            >
              <ShoppingBag size={20} className="text-[#FBB03B]" />
              <span>{t.buyNow}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
