
import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import { Product, Language, Translation, Order, User } from '../types';
import { storageService } from '../services/storageService';
import { telegramService } from '../services/telegramService';

interface Props {
  product: Product;
  user: User;
  lang: Language;
  t: Translation;
  onClose: () => void;
}

const OrderModal: React.FC<Props> = ({ product, user, lang, t, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: user.fullName,
    phone: user.phone,
    address: '',
    size: product.sizes[0] || '',
    color: product.colors[0] || ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      productId: product.id,
      productName: lang === 'en' ? product.name : product.nameAm,
      customerName: formData.customerName,
      phone: formData.phone,
      address: formData.address,
      size: formData.size,
      color: formData.color,
      status: 'Pending',
      createdAt: Date.now()
    };

    storageService.addOrder(newOrder);
    await telegramService.sendOrderNotification(newOrder);

    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-none md:rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 h-full md:h-auto flex flex-col">
        <div className="relative p-5 md:p-6 border-b bg-[#FCFBF4] flex-shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white rounded-full transition-colors bg-gray-100"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl md:text-2xl font-black serif text-gray-800">{t.orderTitle}</h2>
          <p className="text-[#0E2A21] font-bold text-xs md:text-sm mt-1 truncate pr-8">
            {lang === 'en' ? product.name : product.nameAm} - {product.price} ETB
          </p>
        </div>

        <div className="p-6 md:p-8 bg-white overflow-y-auto flex-1">
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle size={40} />
              </div>
              <h3 className="text-xl font-black text-[#0E2A21] serif">{t.successOrder}</h3>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0E2A21]">{t.size}</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#FCFBF4] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#0E2A21] outline-none transition-all text-sm font-bold"
                    value={formData.size}
                    onChange={e => setFormData({...formData, size: e.target.value})}
                  >
                    {product.sizes.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0E2A21]">{t.color}</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#FCFBF4] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#0E2A21] outline-none transition-all text-sm font-bold"
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                  >
                    {product.colors.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0E2A21]">{t.fullName}</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3 bg-[#FCFBF4] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#0E2A21] outline-none transition-all text-sm font-bold"
                  value={formData.customerName}
                  onChange={e => setFormData({...formData, customerName: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0E2A21]">{t.phoneNumber}</label>
                <input 
                  required
                  type="tel"
                  className="w-full px-4 py-3 bg-[#FCFBF4] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#0E2A21] outline-none transition-all text-sm font-bold"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#0E2A21]">{t.deliveryAddress}</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-[#FCFBF4] border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#0E2A21] outline-none transition-all resize-none text-sm font-medium"
                  placeholder="Street, City, Specific location..."
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div className="pt-4 sticky bottom-0 bg-white md:static">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0E2A21] hover:bg-[#8B0000] text-white font-black py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all disabled:opacity-50 uppercase text-xs tracking-widest active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>{t.submitOrder}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
