import { html, Link, LucideReact, useState } from './deps.js';
import { storageService, telegramService } from './services.js';

const { ShoppingBag, Menu, X, Home, ShoppingCart, ShieldCheck, ListOrdered, User: UserIcon, Phone, Send, MapPin, CheckCircle, Tag, Eye } = LucideReact;

export const Header = ({ lang, t, setLang, user }) => {
  const [open, setOpen] = useState(false);
  return html`
    <header className="sticky top-0 z-[100] bg-white shadow-md border-b">
      <div className="tilet-border w-full h-[6px]"></div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <${Link} to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#0E2A21] rounded-full flex items-center justify-center text-[#FBB03B] font-bold">H</div>
          <span className="text-xl font-black serif text-[#0E2A21]">Habesha <span className="text-[#8B0000]">Lbs</span></span>
        </${Link}>
        <nav className="hidden md:flex space-x-6">
          <${Link} to="/" className="text-xs font-black uppercase tracking-widest">${t.navHome}</${Link}>
          <${Link} to="/shop" className="text-xs font-black uppercase tracking-widest">${t.navShop}</${Link}>
          ${user && html`<${Link} to="/orders" className="text-xs font-black uppercase tracking-widest">${t.navOrders}</${Link}>`}
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick=${() => setLang(lang === 'en' ? 'am' : 'en')} className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded-full uppercase">${lang}</button>
          ${user ? html`<${Link} to="/profile" className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-xs font-bold">${user.fullName.charAt(0)}</${Link}>` : 
                   html`<${Link} to="/auth" className="text-xs font-bold uppercase">${t.navLogin}</${Link}>`}
          <button onClick=${() => setOpen(!open)} className="md:hidden"><${Menu} /></button>
        </div>
      </div>
      ${open && html`<div className="md:hidden absolute top-[70px] left-0 w-full bg-white border-b flex flex-col p-4 space-y-4 font-bold uppercase text-xs">
          <${Link} to="/" onClick=${() => setOpen(false)}>${t.navHome}</${Link}>
          <${Link} to="/shop" onClick=${() => setOpen(false)}>${t.navShop}</${Link}>
          <${Link} to="/admin" onClick=${() => setOpen(false)}>${t.navAdmin}</${Link}>
      </div>`}
    </header>
  `;
};

export const Footer = ({ t }) => html`
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 text-center">
      <h3 className="serif text-2xl font-bold mb-4">Habesha Lbs</h3>
      <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-8">
        <span className="flex items-center space-x-2"><${Phone} size=${14}/><span>+251 941 999 176</span></span>
        <span className="flex items-center space-x-2"><${Send} size=${14}/><span>@jaksen27</span></span>
      </div>
      <p className="text-xs text-gray-600">© 2024 Habesha Lbs. Heritage Collection.</p>
    </div>
  </footer>
`;

export const OrderModal = ({ product, user, lang, t, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [addr, setAddr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const order = { id: Math.random().toString(36).substr(2, 9), userId: user.id, productName: lang === 'en' ? product.name : product.nameAm, customerName: user.fullName, phone: user.phone, address: addr, status: 'Pending', createdAt: Date.now() };
    storageService.addOrder(order);
    await telegramService.sendOrderNotification(order);
    setLoading(false); setSuccess(true);
    setTimeout(onClose, 2000);
  };

  return html`
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl">
        ${success ? html`<div className="text-center py-8"><${CheckCircle} className="mx-auto text-green-500 mb-4" size=${48} /> <h2 className="font-bold">${t.successOrder}</h2></div>` : 
        html`
          <h2 className="text-xl font-black mb-4">${t.orderTitle}</h2>
          <p className="text-sm text-gray-500 mb-6">${lang === 'en' ? product.name : product.nameAm}</p>
          <form onSubmit=${submit} className="space-y-4">
            <textarea required className="w-full p-4 bg-gray-50 rounded-xl" placeholder=${t.deliveryAddress} value=${addr} onChange=${e => setAddr(e.target.value)}></textarea>
            <button className="w-full bg-[#0E2A21] text-white py-4 rounded-xl font-bold uppercase text-xs" disabled=${loading}>${loading ? '...' : t.submitOrder}</button>
            <button type="button" onClick=${onClose} className="w-full text-gray-400 text-xs font-bold uppercase">Cancel</button>
          </form>
        `}
      </div>
    </div>
  `;
};