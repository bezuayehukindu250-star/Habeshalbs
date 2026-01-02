import { html, Link, LucideReact, useState, useMemo, useEffect, useNavigate } from './deps.js';
import { storageService, TRANSLATIONS } from './services.js';

const { ArrowRight, ShoppingBag, Eye, Search, ShieldCheck, User: UserIcon, Lock, Mail, Phone, LogOut, ChevronRight, AlertCircle, Package } = LucideReact;

export const HomePage = ({ products, lang, t, onBuy }) => html`
  <div className="bg-[#FCFBF4]">
    <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" />
      <div className="relative z-20 text-white max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black serif mb-6">${t.heroTitle}</h1>
        <p className="text-lg mb-8 opacity-90">${t.heroSub}</p>
        <${Link} to="/shop" className="bg-[#FBB03B] text-[#0E2A21] px-10 py-4 rounded-full font-black uppercase text-sm inline-flex items-center space-x-2"><span>${t.navShop}</span> <${ArrowRight} size=${18}/></${Link}>
      </div>
    </section>
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-black serif mb-12 text-center">${t.featuredTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${products.slice(0, 3).map(p => html`
          <div key=${p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm group">
            <div className="h-96 relative overflow-hidden"><img src=${p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2">${lang === 'en' ? p.name : p.nameAm}</h3>
              <div className="flex justify-between items-center">
                <span className="font-black text-amber-600">${p.price} ETB</span>
                <button onClick=${() => onBuy(p)} className="p-3 bg-[#0E2A21] text-white rounded-xl"><${ShoppingBag} size=${18}/></button>
              </div>
            </div>
          </div>
        `)}
      </div>
    </section>
  </div>
`;

export const ShopPage = ({ products, lang, t, onBuy }) => {
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.nameAm.includes(search)), [products, search]);
  return html`
    <div className="py-12 container mx-auto px-4">
      <div className="mb-12 max-w-md mx-auto relative">
        <${Search} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size=${20}/>
        <input className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none" placeholder=${t.searchPlaceholder} value=${search} onChange=${e => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        ${filtered.map(p => html`
          <div key=${p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
            <img src=${p.image} className="h-64 w-full object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div><h3 className="font-bold mb-1">${lang === 'en' ? p.name : p.nameAm}</h3><p className="text-amber-600 font-black mb-4">${p.price} ETB</p></div>
              <button onClick=${() => onBuy(p)} className="w-full bg-[#0E2A21] text-white py-3 rounded-xl text-xs font-black uppercase">${t.buyNow}</button>
            </div>
          </div>
        `)}
      </div>
    </div>
  `;
};

export const AuthPage = ({ t, onLogin }) => {
  const [isLog, setIsLog] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '+251', pass: '' });
  const nav = useNavigate();
  const sub = (e) => {
    e.preventDefault();
    if (isLog) {
      const u = storageService.getUsers().find(u => u.email === form.email && u.password === form.pass);
      if (u) { onLogin(u); nav('/'); } else alert(t.authError);
    } else {
      const nu = { id: Date.now().toString(), fullName: form.name, email: form.email, phone: form.phone, password: form.pass, createdAt: Date.now() };
      storageService.saveUser(nu); onLogin(nu); nav('/');
    }
  };
  return html`
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl">
        <h2 className="text-2xl font-black mb-6 text-center">${isLog ? t.loginTitle : t.signupTitle}</h2>
        <form onSubmit=${sub} className="space-y-4">
          ${!isLog && html`<input required className="w-full p-4 bg-gray-50 rounded-xl" placeholder=${t.fullName} value=${form.name} onChange=${e => setForm({...form, name: e.target.value})} />`}
          <input required className="w-full p-4 bg-gray-50 rounded-xl" placeholder=${t.email} value=${form.email} onChange=${e => setForm({...form, email: e.target.value})} />
          ${!isLog && html`<input required className="w-full p-4 bg-gray-50 rounded-xl" placeholder=${t.phoneNumber} value=${form.phone} onChange=${e => setForm({...form, phone: e.target.value})} />`}
          <input required type="password" className="w-full p-4 bg-gray-50 rounded-xl" placeholder=${t.password} value=${form.pass} onChange=${e => setForm({...form, pass: e.target.value})} />
          <button className="w-full bg-[#0E2A21] text-white py-4 rounded-xl font-bold uppercase text-xs">${isLog ? t.loginTitle : t.signupTitle}</button>
        </form>
        <button onClick=${() => setIsLog(!isLog)} className="w-full text-center mt-6 text-xs text-amber-600 font-bold">${isLog ? t.dontHaveAccount : t.alreadyHaveAccount}</button>
      </div>
    </div>
  `;
};

export const ProfilePage = ({ user, t, onLogout }) => {
  const nav = useNavigate();
  return html`
    <div className="container mx-auto px-4 py-20 max-w-lg">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold">${user.fullName.charAt(0)}</div>
        <h2 className="text-2xl font-black mb-2">${user.fullName}</h2>
        <p className="text-gray-400 text-sm mb-10">${user.email}</p>
        <button onClick=${() => { onLogout(); nav('/'); }} className="flex items-center space-x-2 mx-auto text-red-500 font-bold uppercase text-xs">
          <${LogOut} size=${16}/> <span>${t.navLogout}</span>
        </button>
      </div>
    </div>
  `;
};

export const AdminDashboard = () => {
  const orders = storageService.getOrders();
  return html`
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-2xl font-black serif mb-8">Admin Dashboard</h2>
      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] uppercase font-black tracking-widest"><tr><th className="p-6">ID</th><th className="p-6">Product</th><th className="p-6">Customer</th><th className="p-6">Status</th></tr></thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            ${orders.map(o => html`<tr><td className="p-6 font-mono text-xs">#${o.id}</td><td className="p-6 font-bold">${o.productName}</td><td className="p-6">${o.customerName}</td><td className="p-6"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold">${o.status}</span></td></tr>`)}
          </tbody>
        </table>
        ${orders.length === 0 && html`<div className="p-20 text-center text-gray-300">No orders yet.</div>`}
      </div>
    </div>
  `;
};