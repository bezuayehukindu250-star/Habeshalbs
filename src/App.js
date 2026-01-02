import { html, HashRouter, Routes, Route, useState, useEffect, Navigate } from './deps.js';
import { TRANSLATIONS, storageService } from './services.js';
import { Header, Footer, OrderModal } from './components.js';
import { HomePage, ShopPage, AuthPage, ProfilePage, AdminDashboard } from './pages.js';

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState(storageService.getCurrentUser());
  const [buying, setBuying] = useState(null);
  const t = TRANSLATIONS[lang];

  const products = storageService.getProducts();

  const handleBuy = (p) => {
    if (!user) { window.location.hash = '#/auth'; return; }
    setBuying(p);
  };

  return html`
    <${HashRouter}>
      <div className="min-h-screen flex flex-col bg-[#FCFBF4]">
        <${Header} lang=${lang} t=${t} setLang=${setLang} user=${user} />
        <main className="flex-1">
          <${Routes}>
            <Route path="/" element=${html`<${HomePage} products=${products} lang=${lang} t=${t} onBuy=${handleBuy} />`} />
            <Route path="/shop" element=${html`<${ShopPage} products=${products} lang=${lang} t=${t} onBuy=${handleBuy} />`} />
            <Route path="/auth" element=${html`<${AuthPage} lang=${lang} t=${t} onLogin=${(u) => { storageService.setCurrentUser(u); setUser(u); }} />`} />
            <Route path="/profile" element=${user ? html`<${ProfilePage} user=${user} lang=${lang} t=${t} onLogout=${() => { storageService.logoutUser(); setUser(null); }} />` : html`<${Navigate} to="/auth" />`} />
            <Route path="/admin" element=${html`<${AdminDashboard} />`} />
            <Route path="*" element=${html`<${Navigate} to="/" />`} />
          </${Routes}>
        </main>
        <${Footer} t=${t} />
        ${buying && html`<${OrderModal} product=${buying} user=${user} lang=${lang} t=${t} onClose=${() => setBuying(null)} />`}
      </div>
    </${HashRouter}>
  `;
}