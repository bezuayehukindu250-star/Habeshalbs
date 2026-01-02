
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Language, Translation } from '../types';
import { storageService } from '../services/storageService';
import { Mail, Lock, User as UserIcon, Phone, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface Props {
  lang: Language;
  t: Translation;
  onLogin: (user: User) => void;
}

const AuthPage: React.FC<Props> = ({ lang, t, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+251',
    password: ''
  });

  const validate = () => {
    if (!isLogin) {
      if (!formData.fullName.trim().includes(' ')) {
        setError(t.fullNameError);
        return false;
      }
      if (formData.password.length < 6) {
        setError(t.passwordError);
        return false;
      }
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    const users = storageService.getUsers();

    if (isLogin) {
      const user = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase() && u.password === formData.password);
      if (user) {
        onLogin(user);
        navigate(from, { replace: true });
      } else {
        setError(t.authError + " - Please check your email and password.");
      }
    } else {
      const exists = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase() || u.phone === formData.phone);
      if (exists) {
        setError(t.duplicateError);
        return;
      }

      const newUser: User = {
        id: `user-${Date.now()}`,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        createdAt: Date.now()
      };

      storageService.saveUser(newUser);
      onLogin(newUser);
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FCFBF4] flex items-center justify-center p-4 py-8 md:py-20">
      <div className="w-full max-w-lg bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl border-2 border-gray-100 overflow-hidden">
        <div className="bg-[#0E2A21] p-8 md:p-12 text-white text-center">
          <h1 className="text-3xl md:text-4xl font-black serif mb-2">
            {isLogin ? t.loginTitle : t.signupTitle}
          </h1>
          <p className="text-[#FBB03B] text-[10px] md:text-xs font-black uppercase tracking-widest opacity-80">
            {isLogin ? 'Welcome back to Habesha Lbs' : 'Join our heritage family'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-5 md:space-y-6 bg-white">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl md:rounded-2xl flex items-center space-x-3 text-xs md:text-sm font-bold border-2 border-red-200 animate-pulse">
              <AlertCircle size={20} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest">{t.fullName}</label>
              <div className="relative group">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21]" size={18} />
                <input 
                  required
                  type="text"
                  placeholder="Your Name Space Father Name"
                  className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#FCFBF4] border-2 border-transparent rounded-xl md:rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                  value={formData.fullName}
                  onChange={e => setFormData({...formData, fullName: e.target.value})}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest">{t.email}</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21]" size={18} />
              <input 
                required
                type="email"
                placeholder="email@example.com"
                className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#FCFBF4] border-2 border-transparent rounded-xl md:rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest">{t.phoneNumber}</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21]" size={18} />
                <input 
                  required
                  type="tel"
                  className="w-full pl-12 pr-4 py-3 md:py-4 bg-[#FCFBF4] border-2 border-transparent rounded-xl md:rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                  value={formData.phone}
                  onChange={e => {
                    let val = e.target.value;
                    if (!val.startsWith('+251')) val = '+251' + val.replace('+251', '');
                    setFormData({...formData, phone: val});
                  }}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-[#0E2A21] uppercase tracking-widest">{t.password}</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0E2A21]" size={18} />
              <input 
                required
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 digits"
                className="w-full pl-12 pr-12 py-3 md:py-4 bg-[#FCFBF4] border-2 border-transparent rounded-xl md:rounded-2xl outline-none focus:border-[#0E2A21] transition-all font-bold text-sm"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0E2A21] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0E2A21] hover:bg-[#8B0000] text-white font-black py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-xl transition-all flex items-center justify-center space-x-3 uppercase text-xs md:text-sm tracking-widest group active:scale-95"
          >
            <span>{isLogin ? t.loginTitle : t.signupTitle}</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="pt-4 text-center">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); setShowPassword(false); }}
              className="text-amber-600 font-black text-xs md:text-sm hover:underline"
            >
              {isLogin ? t.dontHaveAccount : t.alreadyHaveAccount}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
