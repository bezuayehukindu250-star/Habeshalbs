
import React, { useState } from 'react';
import { Lock, Mail, ChevronRight, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Normalize inputs for robustness
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    // Credentials check:
    // Email: bezuayehukindu250@gmail.com
    // Password: Ab2149$$
    if (normalizedEmail === 'bezuayehukindu250@gmail.com' && normalizedPassword === 'Ab2149$$') {
      sessionStorage.setItem('habesha_admin_auth', 'true');
      onLogin();
    } else {
      setError('you are not admin');
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-[#FCFBF4] px-4 py-12">
      <style>{`
        @keyframes shake-x {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake-x {
          animation: shake-x 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>

      <Link to="/" className="mb-8 flex items-center space-x-2 text-gray-500 hover:text-[#0E2A21] font-black uppercase text-[10px] tracking-widest transition-colors">
        <ArrowLeft size={16} />
        <span>Back to Storefront</span>
      </Link>

      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-gray-100">
        <div className="bg-[#0E2A21] p-8 md:p-10 text-white text-center">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 border border-white/20">
            <Lock size={32} className="text-[#FBB03B]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black serif">Admin Portal</h1>
          <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mt-2">Authorized Access Only</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6 bg-white">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center space-x-3 text-xs font-black uppercase tracking-tighter border border-red-100 animate-shake-x">
              <ShieldAlert size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest ml-1">Admin Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21] transition-colors" size={20} />
              <input 
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#FCFBF4] border-2 border-transparent rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest ml-1">Security Key</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21] transition-colors" size={20} />
              <input 
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 bg-[#FCFBF4] border-2 border-transparent rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0E2A21] hover:bg-[#8B0000] text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center group active:scale-95 uppercase text-xs tracking-widest"
          >
            <span>Verify Identity</span>
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
