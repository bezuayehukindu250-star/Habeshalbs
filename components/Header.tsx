
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, Home, ShoppingCart, ShieldCheck, ListOrdered, User as UserIcon } from 'lucide-react';
import { Language, Translation, User } from '../types';
import LanguageToggle from './LanguageToggle';

interface Props {
  lang: Language;
  t: Translation;
  setLang: (l: Language) => void;
  user: User | null;
}

const Header: React.FC<Props> = ({ lang, t, setLang, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-[100] bg-white shadow-md border-b">
      <div className="tilet-border w-full h-[6px] bg-[#FCFBF4]"></div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between bg-white">
        <Link to="/" onClick={closeMenu} className="flex items-center space-x-3">
          <div className="w-11 h-11 bg-[#0E2A21] rounded-full flex items-center justify-center text-[#FBB03B] font-bold text-xl border-2 border-[#FBB03B]">
            H
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black serif text-[#0E2A21] leading-none tracking-tight">
              Habesha <span className="text-[#8B0000]">Lbs</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-600">Traditional Wear</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[#0E2A21] hover:text-amber-600 font-bold transition-colors uppercase text-sm tracking-wide">{t.navHome}</Link>
          <Link to="/shop" className="text-[#0E2A21] hover:text-amber-600 font-bold transition-colors uppercase text-sm tracking-wide">{t.navShop}</Link>
          {user && (
            <Link to="/orders" className="text-[#0E2A21] hover:text-amber-600 font-bold transition-colors uppercase text-sm tracking-wide">{t.navOrders}</Link>
          )}
          <Link to="/admin" className="text-gray-400 hover:text-[#0E2A21] font-medium transition-colors uppercase text-sm tracking-wide">{t.navAdmin}</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:block">
            <LanguageToggle current={lang} onChange={setLang} />
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <Link to="/profile" className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-gray-100 transition-all">
                <div className="w-8 h-8 bg-[#0E2A21] text-[#FBB03B] rounded-full flex items-center justify-center font-black text-xs">
                   {user.fullName.charAt(0)}
                </div>
                <span className="text-xs font-black text-[#0E2A21] uppercase tracking-tighter">
                  {user.fullName.split(' ')[0]}
                </span>
              </Link>
            ) : (
              <Link to="/auth" className="flex items-center space-x-2 bg-[#0E2A21] text-white px-5 py-2 rounded-full font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all">
                <UserIcon size={14} />
                <span>{t.navLogin}</span>
              </Link>
            )}
          </div>
          
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 text-[#0E2A21] hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[80px] bg-white z-[99] border-t-2 border-[#0E2A21]">
          <nav className="flex flex-col h-full bg-white divide-y divide-gray-100">
            <div className="p-6 bg-[#FCFBF4] sm:hidden border-b flex justify-between items-center">
                 <span className="font-bold text-gray-400 uppercase text-xs">Switch Language</span>
                 <LanguageToggle current={lang} onChange={setLang} />
            </div>
            
            <Link to="/" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-[#0E2A21] hover:bg-[#FCFBF4] bg-white transition-all">
              <Home size={28} className="text-amber-600" />
              <span>{t.navHome}</span>
            </Link>
            
            <Link to="/shop" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-[#0E2A21] hover:bg-[#FCFBF4] bg-white transition-all">
              <ShoppingCart size={28} className="text-amber-600" />
              <span>{t.navShop}</span>
            </Link>

            {user ? (
              <>
                <Link to="/orders" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-[#0E2A21] hover:bg-[#FCFBF4] bg-white transition-all">
                  <ListOrdered size={28} className="text-amber-600" />
                  <span>{t.navOrders}</span>
                </Link>
                <Link to="/profile" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-[#0E2A21] hover:bg-[#FCFBF4] bg-white transition-all">
                  <UserIcon size={28} className="text-amber-600" />
                  <span>{t.navProfile}</span>
                </Link>
              </>
            ) : (
              <Link to="/auth" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-[#0E2A21] hover:bg-[#FCFBF4] bg-white transition-all">
                <UserIcon size={28} className="text-amber-600" />
                <span>{t.navLogin} / {t.signupTitle}</span>
              </Link>
            )}
            
            <Link to="/admin" onClick={closeMenu} className="flex items-center space-x-6 p-8 text-2xl font-bold text-gray-400 hover:bg-[#FCFBF4] bg-white transition-all">
              <ShieldCheck size={28} className="text-gray-400" />
              <span>{t.navAdmin}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
