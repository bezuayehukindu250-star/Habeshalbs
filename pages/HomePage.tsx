
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShoppingBag, Phone, ShieldCheck, Globe, Eye } from 'lucide-react';
import { Product, Language, Translation } from '../types';

interface Props {
  products: Product[];
  lang: Language;
  t: Translation;
  onBuy: (p: Product) => void;
  onViewDetail: (p: Product) => void;
}

const HomePage: React.FC<Props> = ({ products, lang, t, onBuy, onViewDetail }) => {
  const featured = products.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="bg-[#FCFBF4]">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-white">
          <img 
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-90"
            alt="Habesha Culture"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E2A21] via-[#0E2A21]/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl space-y-8">
            <div className="inline-flex items-center space-x-2 px-5 py-2 bg-[#FBB03B] text-[#0E2A21] rounded-full text-xs font-black uppercase tracking-tighter">
              <ShieldCheck size={14} />
              <span>100% Hand-woven Cotton</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] serif">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-200 font-medium max-w-xl leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 pt-10">
              <Link 
                to="/shop" 
                className="bg-[#FBB03B] hover:bg-white text-[#0E2A21] font-black px-10 py-5 rounded-full flex items-center justify-center space-x-3 transition-all solid-shadow uppercase text-sm"
              >
                <span>{t.navShop}</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="bg-white py-32 border-b-8 border-[#0E2A21]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20">
            <div className="text-center md:text-left">
              <span className="text-amber-600 font-black uppercase tracking-widest text-xs">Exclusives</span>
              <h2 className="text-5xl font-black serif text-[#0E2A21] mt-2">{t.featuredTitle}</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center space-x-3 text-[#0E2A21] font-bold hover:translate-x-2 transition-transform">
              <span className="text-lg">View Entire Catalog</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {featured.map(product => (
              <div key={product.id} className="group flex flex-col">
                <div className="relative h-[550px] overflow-hidden rounded-3xl solid-shadow bg-[#FCFBF4]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex space-x-3 translate-y-24 group-hover:translate-y-0 transition-all duration-500">
                    <button 
                      onClick={() => onViewDetail(product)}
                      className="flex-1 bg-white text-[#0E2A21] font-black py-5 rounded-2xl flex items-center justify-center space-x-2 uppercase text-xs"
                    >
                      <Eye size={18} />
                      <span>{t.viewDetails}</span>
                    </button>
                    <button 
                      onClick={() => onBuy(product)}
                      className="bg-[#FBB03B] text-[#0E2A21] p-5 rounded-2xl"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
                <div className="mt-8 px-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-[#0E2A21] serif">
                      {lang === 'en' ? product.name : product.nameAm}
                    </h3>
                    <span className="bg-[#0E2A21] text-[#FBB03B] px-3 py-1 rounded-lg font-black">{product.price} ETB</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#0E2A21] text-white py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-6xl font-black serif leading-tight">Preserving Our <span className="text-[#FBB03B]">Golden</span> Heritage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#FBB03B]">
                    <Star size={32} />
                  </div>
                  <h4 className="text-xl font-bold">Premium Quality</h4>
                  <p className="text-gray-400 text-sm">Every thread is inspected by master weavers in Addis Ababa.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-green-400">
                    <Globe size={32} />
                  </div>
                  <h4 className="text-xl font-bold">Global Shipping</h4>
                  <p className="text-gray-400 text-sm">We deliver across the globe.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
