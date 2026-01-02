import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useNavigate, 
  useLocation, 
  Navigate 
} from 'react-router-dom';
import { 
  ShoppingBag, Menu, X, Home, ShoppingCart, ShieldCheck, 
  ListOrdered, User as UserIcon, Phone, Send, MapPin, 
  CheckCircle, Tag, Eye, LogOut, ArrowRight, Search, 
  Lock, Mail, ChevronRight, ShieldAlert, Clock, TrendingUp, Package, Edit3, Trash2, Plus
} from 'lucide-react';

// --- DATA & CONSTANTS ---
const INITIAL_PRODUCTS = [
  {
    id: 'wollo-01',
    name: 'Wollo Kemis - Traditional Chic',
    nameAm: 'የወሎ ባህል ቀሚስ',
    description: 'Authentic Wollo embroidery featuring the iconic colorful Tilet patterns on premium hand-spun cotton.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000&auto=format&fit=crop',
    category: 'Women',
    isFeatured: true
  },
  {
    id: 'gondar-01',
    name: 'Gondar Royal Kemis',
    nameAm: 'የጎንደር ባህል ቀሚስ',
    description: 'Inspired by the royalty of Gondar, this dress features thick, elegant embroidery patterns.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop',
    category: 'Women',
    isFeatured: true
  }
];

const TRANSLATIONS = {
  en: {
    navHome: 'Home', navShop: 'Collection', navAdmin: 'Admin', navOrders: 'My Orders', navLogin: 'Login', navLogout: 'Logout',
    heroTitle: 'Authentic Habesha Tradition', heroSub: 'Hand-woven Ethiopian excellence delivered to your doorstep.',
    buyNow: 'Order Now', successOrder: 'Order Received!', submitOrder: 'Confirm Order', deliveryAddress: 'Shipping Address', 
    orderTitle: 'Complete Order', featuredTitle: 'Masterpiece Collection'
  },
  am: {
    navHome: 'መነሻ', navShop: 'ምርቶች', navAdmin: 'አስተዳዳሪ', navOrders: 'ትዕዛዞቼ', navLogin: 'ግባ', navLogout: 'ውጣ',
    heroTitle: 'እውነተኛ የሀበሻ ጥበብ', heroSub: 'በእጅ የተሰሩ ምርጥ የኢትዮጵያ ባህል ልብሶች።',
    buyNow: 'አሁኑኑ ይዘዙ', successOrder: 'ተቀብለናል!', submitOrder: 'ትእዛዝ አረጋግጥ', deliveryAddress: 'አድራሻ', 
    orderTitle: 'ትእዛዝ ያጠናቅቁ', featuredTitle: 'ልዩ ምርቶቻችን'
  }
};

// --- STORAGE SERVICE ---
const PK = 'hab_p'; const OK = 'hab_o'; const UK = 'hab_u'; const CK = 'hab_c';
const storage = {
  getProducts: () => JSON.parse(localStorage.getItem(PK) || 'null') || INITIAL_PRODUCTS,
  saveProducts: (p: any) => localStorage.setItem(PK, JSON.stringify(p)),
  getOrders: () => JSON.parse(localStorage.getItem(OK) || '[]'),
  addOrder: (o: any) => { const all = storage.getOrders(); all.unshift(o); localStorage.setItem(OK, JSON.stringify(all)); },
  getUsers: () => JSON.parse(localStorage.getItem(UK) || '[]'),
  saveUser: (u: any) => { const all = storage.getUsers(); all.push(u); localStorage.setItem(UK, JSON.stringify(all)); },
  getCurrentUser: () => JSON.parse(localStorage.getItem(CK) || 'null'),
  setCurrentUser: (u: any) => localStorage.setItem(CK, JSON.stringify(u)),
  logout: () => localStorage.removeItem(CK)
};

// --- UI COMPONENTS ---
const Header = ({ lang, t, setLang, user }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-[100] bg-white shadow-md border-b">
      <div className="tilet-border w-full h-[6px]"></div>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" onClick={() => setOpen(false)} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-[#0E2A21] rounded-full flex items-center justify-center text-[#FBB03B] font-bold">H</div>
          <span className="text-xl font-black serif text-[#0E2A21]">Habesha <span className="text-[#8B0000]">Lbs</span></span>
        </Link>
        <nav className="hidden md:flex space-x-8 font-black uppercase text-[11px] tracking-widest">
          <Link to="/" className="hover:text-amber-600 transition-colors">{t.navHome}</Link>
          <Link to="/shop" className="hover:text-amber-600 transition-colors">{t.navShop}</Link>
          {user && <Link to="/orders" className="hover:text-amber-600 transition-colors">{t.navOrders}</Link>}
        </nav>
        <div className="flex items-center space-x-4">
          <button onClick={() => setLang(lang === 'en' ? 'am' : 'en')} className="text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full uppercase">{lang}</button>
          {user ? (
            <Link to="/profile" className="w-8 h-8 bg-[#0E2A21] text-[#FBB03B] rounded-full flex items-center justify-center text-xs font-bold">{user.fullName.charAt(0)}</Link>
          ) : (
            <Link to="/auth" className="text-[11px] font-black uppercase tracking-wider text-[#0E2A21]">{t.navLogin}</Link>
          )}
          <button onClick={() => setOpen(!open)} className="md:hidden"><Menu /></button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-white border-t p-6 flex flex-col space-y-6 font-black uppercase text-xs tracking-widest absolute w-full shadow-xl">
          <Link to="/" onClick={() => setOpen(false)}>{t.navHome}</Link>
          <Link to="/shop" onClick={() => setOpen(false)}>{t.navShop}</Link>
          <Link to="/admin" onClick={() => setOpen(false)}>{t.navAdmin}</Link>
        </div>
      )}
    </header>
  );
};

const OrderModal = ({ product, user, lang, t, onClose }: any) => {
  const [success, setSuccess] = useState(false);
  const [addr, setAddr] = useState('');
  const [load, setLoad] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);
    const order = { 
      id: Math.random().toString(36).substr(2, 6), 
      userId: user.id, 
      productName: lang === 'en' ? product.name : product.nameAm, 
      customerName: user.fullName, 
      phone: user.phone, 
      address: addr, 
      status: 'Pending', 
      createdAt: Date.now() 
    };
    storage.addOrder(order);
    setTimeout(() => { setLoad(false); setSuccess(true); setTimeout(onClose, 2000); }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-[2rem] shadow-2xl relative">
        {success ? (
          <div className="text-center py-10">
            <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
            <h2 className="font-black text-xl serif">{t.successOrder}</h2>
          </div>
        ) : (
          <>
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black"><X /></button>
            <h2 className="text-2xl font-black serif mb-2 text-[#0E2A21]">{t.orderTitle}</h2>
            <p className="text-xs font-bold text-amber-600 mb-8 uppercase tracking-widest">{lang === 'en' ? product.name : product.nameAm}</p>
            <form onSubmit={submit} className="space-y-6">
              <textarea required rows={3} className="w-full p-5 bg-[#FCFBF4] border border-gray-100 rounded-2xl outline-none focus:border-[#0E2A21] font-medium" placeholder={t.deliveryAddress} value={addr} onChange={e => setAddr(e.target.value)}></textarea>
              <button className="w-full bg-[#0E2A21] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl transition-all" disabled={load}>
                {load ? 'Processing...' : t.submitOrder}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- PAGES ---
const HomePage = ({ products, lang, t, onBuy }: any) => (
  <div className="bg-[#FCFBF4]">
    <section className="relative h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover scale-105" alt="Habesha Hero" />
      <div className="relative z-20 text-white max-w-3xl">
        <h1 className="text-6xl md:text-8xl font-black serif mb-6 leading-none tracking-tight">{t.heroTitle}</h1>
        <p className="text-lg md:text-xl mb-10 opacity-90 font-medium">{t.heroSub}</p>
        <Link to="/shop" className="bg-[#FBB03B] text-[#0E2A21] px-12 py-5 rounded-full font-black uppercase text-xs tracking-[0.2em] inline-flex items-center space-x-3 shadow-2xl hover:bg-white transition-all">
          <span>Explore Collection</span> <ArrowRight size={18}/>
        </Link>
      </div>
    </section>
    <section className="py-24 container mx-auto px-4">
      <h2 className="text-4xl font-black serif text-[#0E2A21] text-center mb-16">{t.featuredTitle}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {products.slice(0, 2).map((p: any) => (
          <div key={p.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm group border border-gray-100">
            <div className="h-[500px] relative overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} /></div>
            <div className="p-10 flex justify-between items-center">
              <div>
                <h3 className="font-black serif text-2xl text-[#0E2A21] mb-1">{lang === 'en' ? p.name : p.nameAm}</h3>
                <span className="font-black text-amber-600 text-lg">{p.price} ETB</span>
              </div>
              <button onClick={() => onBuy(p)} className="p-5 bg-[#0E2A21] text-white rounded-2xl shadow-xl hover:bg-[#8B0000] transition-colors"><ShoppingBag size={24}/></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ShopPage = ({ products, lang, t, onBuy }: any) => {
  const [search, setSearch] = useState('');
  const filtered = products.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()) || p.nameAm.includes(search));
  return (
    <div className="py-20 container mx-auto px-4">
      <div className="max-w-md mx-auto mb-16 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input className="w-full pl-12 pr-6 py-5 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:border-[#0E2A21] font-bold" placeholder="Search heritage pieces..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filtered.map((p: any) => (
          <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm flex flex-col group border border-gray-50">
            <div className="h-80 overflow-hidden"><img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={p.name} /></div>
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#0E2A21]">{lang === 'en' ? p.name : p.nameAm}</h3>
                <p className="text-amber-600 font-black mt-2 mb-6">{p.price} ETB</p>
              </div>
              <button onClick={() => onBuy(p)} className="w-full bg-[#0E2A21] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest">{t.buyNow}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AuthPage = ({ onLogin }: any) => {
  const [isLog, setIsLog] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', phone: '+251', pass: '' });
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLog) {
      const u = storage.getUsers().find((u: any) => u.email === form.email && u.password === form.pass);
      if (u) { onLogin(u); navigate('/'); } else alert('Invalid Credentials');
    } else {
      const nu = { id: Date.now().toString(), fullName: form.name, email: form.email, phone: form.phone, password: form.pass };
      storage.saveUser(nu); onLogin(nu); navigate('/');
    }
  };
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
        <h2 className="text-3xl font-black mb-8 text-center serif text-[#0E2A21]">{isLog ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={submit} className="space-y-5">
          {!isLog && <input required className="w-full p-5 bg-[#FCFBF4] rounded-2xl outline-none font-bold text-sm" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />}
          <input required className="w-full p-5 bg-[#FCFBF4] rounded-2xl outline-none font-bold text-sm" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          {!isLog && <input required className="w-full p-5 bg-[#FCFBF4] rounded-2xl outline-none font-bold text-sm" placeholder="Phone (+251...)" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />}
          <input required type="password" className="w-full p-5 bg-[#FCFBF4] rounded-2xl outline-none font-bold text-sm" placeholder="Password" value={form.pass} onChange={e => setForm({...form, pass: e.target.value})} />
          <button className="w-full bg-[#0E2A21] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">Continue</button>
        </form>
        <button onClick={() => setIsLog(!isLog)} className="w-full text-center mt-8 text-[11px] text-amber-600 font-black uppercase tracking-widest">{isLog ? "Create Account" : "Back to Login"}</button>
      </div>
    </div>
  );
};

const AdminPortal = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [authed, setAuthed] = useState(sessionStorage.getItem('hab_adm') === 't');
  const orders = storage.getOrders();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'bezuayehukindu250@gmail.com' && pass === 'Ab2149$$') {
      sessionStorage.setItem('hab_adm', 't'); setAuthed(true);
    } else { alert('you are not admin'); }
  };

  if (!authed) return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#0E2A21]">
      <div className="bg-white w-full max-w-sm p-10 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-2xl font-black serif mb-8 text-center">Admin Access</h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" placeholder="Admin Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className="w-full p-4 bg-gray-50 rounded-xl outline-none font-bold text-sm" placeholder="Security Key" value={pass} onChange={e => setPass(e.target.value)} />
          <button className="w-full bg-[#0E2A21] text-white py-4 rounded-xl font-black uppercase text-[10px] tracking-widest">Login</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <h2 className="text-4xl font-black serif mb-10 text-[#0E2A21]">Live Orders</h2>
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-[#FCFBF4] text-[10px] uppercase font-black tracking-widest border-b">
            <tr><th className="p-8">Ref</th><th className="p-8">Product</th><th className="p-8">Customer</th><th className="p-8">Status</th></tr>
          </thead>
          <tbody className="divide-y text-sm">
            {orders.map((o: any) => (
              <tr key={o.id}><td className="p-8 font-mono text-xs">#{o.id}</td><td className="p-8 font-black">{o.productName}</td><td className="p-8">{o.customerName}</td><td className="p-8"><span className="bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-[10px] font-black uppercase">{o.status}</span></td></tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <div className="p-32 text-center text-gray-300 font-black uppercase tracking-widest text-xs">No activity yet.</div>}
      </div>
    </div>
  );
};

// --- APP CORE ---
const App = () => {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(storage.getCurrentUser());
  const [buying, setBuying] = useState(null);
  const t = TRANSLATIONS[lang as keyof typeof TRANSLATIONS];
  const products = storage.getProducts();

  const handleBuy = (p: any) => { if (!user) { window.location.hash = '#/auth'; return; } setBuying(p); };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header lang={lang} t={t} setLang={setLang} user={user} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage products={products} lang={lang} t={t} onBuy={handleBuy} />} />
            <Route path="/shop" element={<ShopPage products={products} lang={lang} t={t} onBuy={handleBuy} />} />
            <Route path="/auth" element={<AuthPage onLogin={(u: any) => { storage.setCurrentUser(u); setUser(u); }} />} />
            <Route path="/profile" element={<div className="py-32 text-center"><button onClick={() => { storage.logout(); setUser(null); window.location.hash = '#/'; }} className="text-red-500 font-black uppercase tracking-widest border-2 border-red-500 px-10 py-4 rounded-full">Sign Out</button></div>} />
            <Route path="/orders" element={<AdminPortal />} />
            <Route path="/admin" element={<AdminPortal />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <footer className="bg-[#0E2A21] text-white py-16 text-center">
            <h3 className="serif text-2xl font-black mb-4">Habesha Lbs</h3>
            <div className="flex justify-center space-x-8 text-gray-400 text-[11px] font-black uppercase tracking-widest mb-10">
                <span className="flex items-center space-x-2"><Phone size={14}/><span>+251 941 999 176</span></span>
                <span className="flex items-center space-x-2"><Send size={14}/><span>@jaksen27</span></span>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">© 2024 Habesha Lbs</p>
        </footer>
        {buying && <OrderModal product={buying} user={user} lang={lang} t={t} onClose={() => setBuying(null)} />}
        
        {/* Persistent Floating Icons for Mobile Support */}
        <div className="fixed bottom-6 right-6 z-[90] flex flex-col space-y-4">
           <a href="https://t.me/jaksen27" target="_blank" className="w-14 h-14 bg-[#0088cc] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><Send size={28} /></a>
           <a href="tel:+251941999176" className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"><Phone size={28} /></a>
        </div>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode><App /></React.StrictMode>);
