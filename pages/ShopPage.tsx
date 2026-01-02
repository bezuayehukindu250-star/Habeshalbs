
import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, Eye } from 'lucide-react';
import { Product, Language, Translation } from '../types';

interface Props {
  products: Product[];
  lang: Language;
  t: Translation;
  onBuy: (p: Product) => void;
  onViewDetail: (p: Product) => void;
}

const ShopPage: React.FC<Props> = ({ products, lang, t, onBuy, onViewDetail }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.nameAm.includes(search) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="bg-[#FCFBF4] min-h-screen pb-32">
      <div className="bg-[#0E2A21] text-white py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
           <h1 className="text-4xl md:text-6xl font-black serif mb-4 md:mb-6">{t.navShop}</h1>
           <p className="text-[#FBB03B] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-[10px] md:text-sm">Authentic Heritage Collections</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 md:-mt-10">
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-2 border-gray-100">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21]" size={20} />
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-6 py-4 md:py-5 bg-[#FCFBF4] border-2 border-transparent rounded-xl md:rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide space-x-2 md:space-x-3 justify-start md:justify-center">
             {['All', 'Women', 'Men', 'Kids', 'Accessories'].map(cat => (
               <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
                  activeCategory === cat 
                    ? 'bg-[#0E2A21] text-white shadow-xl' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
               >
                 {cat === 'All' ? t.all : cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-10 mt-12 md:mt-20">
          {filtered.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl md:rounded-[2rem] overflow-hidden border-2 border-gray-50 hover:border-[#FBB03B] transition-all duration-500 flex flex-col shadow-sm">
              <div className="relative h-64 md:h-[400px] overflow-hidden bg-[#FCFBF4]">
                <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name} />
                <div className="absolute top-4 left-4">
                   <span className="bg-[#0E2A21] text-[#FBB03B] text-[8px] md:text-[10px] font-black uppercase px-3 md:px-4 py-1.5 md:py-2 rounded-full tracking-widest">
                     {product.category}
                   </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-black text-[#0E2A21] serif leading-tight">
                    {lang === 'en' ? product.name : product.nameAm}
                  </h3>
                  <p className="text-xl md:text-2xl font-black text-amber-600 mt-2">{product.price} ETB</p>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-gray-50">
                  <button 
                    onClick={() => onViewDetail(product)}
                    className="flex-1 bg-gray-100 hover:bg-[#0E2A21] hover:text-white text-[#0E2A21] font-black py-3 md:py-4 rounded-xl md:rounded-2xl transition-all flex items-center justify-center space-x-2 text-[10px] md:text-xs uppercase"
                  >
                    <Eye size={16} />
                    <span>{t.viewDetails}</span>
                  </button>
                  <button 
                    onClick={() => onBuy(product)}
                    className="p-3 md:p-4 bg-[#0E2A21] hover:bg-[#8B0000] text-white rounded-xl md:rounded-2xl transition-all shadow-lg active:scale-90"
                  >
                    <ShoppingBag size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
               <p className="text-gray-400 font-black uppercase text-xs tracking-widest">No Heritage Items Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
