
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Language, Product, Translation, User } from './types';
import { TRANSLATIONS } from './constants';
import { storageService } from './services/storageService';

import Header from './components/Header';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import ProductDetailModal from './components/ProductDetailModal';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import OrdersPage from './pages/OrdersPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

import { Phone, Send } from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [products, setProducts] = useState<Product[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    sessionStorage.getItem('habesha_admin_auth') === 'true'
  );

  const t: Translation = TRANSLATIONS[lang];

  const refreshProducts = useCallback(() => {
    // Explicitly load from storageService to ensure we get custom added products
    const list = storageService.getProducts();
    setProducts([...list]); // spread to trigger re-render
  }, []);

  useEffect(() => {
    refreshProducts();
    const user = storageService.getCurrentUser();
    setCurrentUser(user);
  }, [refreshProducts]);

  const handleLogin = (user: User) => {
    storageService.setCurrentUser(user);
    setCurrentUser(user);
    // Explicit refresh after login to ensure no state loss
    refreshProducts();
  };

  const handleLogout = () => {
    storageService.logoutUser();
    setCurrentUser(null);
    // Explicit refresh after logout to ensure no state loss
    refreshProducts();
  };

  const handleBuyClick = (product: Product) => {
    if (!currentUser) {
      window.location.hash = '#/auth';
      return;
    }
    setSelectedProduct(product);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-[#FCFBF4]">
        <Header lang={lang} t={t} setLang={setLang} user={currentUser} />
        
        <main className="flex-1 bg-[#FCFBF4]">
          <Routes>
            <Route path="/" element={
              <HomePage 
                products={products} 
                lang={lang} 
                t={t} 
                onBuy={handleBuyClick} 
                onViewDetail={setDetailProduct}
              />
            } />
            <Route path="/shop" element={
              <ShopPage 
                products={products} 
                lang={lang} 
                t={t} 
                onBuy={handleBuyClick} 
                onViewDetail={setDetailProduct}
              />
            } />
            <Route path="/auth" element={
              <AuthPage lang={lang} t={t} onLogin={handleLogin} />
            } />
            <Route path="/profile" element={
              currentUser ? (
                <ProfilePage lang={lang} t={t} user={currentUser} onLogout={handleLogout} />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />
            <Route path="/orders" element={
              currentUser ? (
                <OrdersPage lang={lang} t={t} user={currentUser} />
              ) : (
                <Navigate to="/auth" replace />
              )
            } />
            <Route path="/admin" element={
              isAdminAuthenticated ? (
                <AdminDashboard onProductsUpdated={refreshProducts} />
              ) : (
                <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
              )
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer t={t} />

        {/* Global Floating Contact Buttons */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[90] flex flex-col space-y-3 md:space-y-4">
           {/* Telegram @jaksen27 with pre-filled inbox text */}
           <a 
            href="https://t.me/jaksen27?text=what%20is%20your%20question" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-12 h-12 md:w-14 md:h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-90"
           >
             <Send size={24} className="md:hidden" />
             <Send size={28} className="hidden md:block" />
           </a>
           {/* Phone +251941999176 */}
           <a 
            href="tel:+251941999176" 
            className="w-12 h-12 md:w-14 md:h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-90"
           >
             <Phone size={24} className="md:hidden" />
             <Phone size={28} className="hidden md:block" />
           </a>
        </div>

        {/* Modal Overlay: Order */}
        {selectedProduct && currentUser && (
          <OrderModal 
            product={selectedProduct} 
            user={currentUser}
            lang={lang} 
            t={t} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}

        {/* Modal Overlay: Detail */}
        {detailProduct && (
          <ProductDetailModal 
            product={detailProduct} 
            lang={lang} 
            t={t} 
            onClose={() => setDetailProduct(null)}
            onBuy={handleBuyClick}
          />
        )}
      </div>
    </Router>
  );
};

export default App;
