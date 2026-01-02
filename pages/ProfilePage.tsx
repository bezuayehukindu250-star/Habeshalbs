
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Language, Translation } from '../types';
import { Mail, Phone, Lock, Eye, EyeOff, LogOut, User as UserIcon } from 'lucide-react';
import { storageService } from '../services/storageService';

interface Props {
  user: User;
  lang: Language;
  t: Translation;
  onLogout: () => void;
}

const ProfilePage: React.FC<Props> = ({ user, lang, t, onLogout }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="bg-[#FCFBF4] min-h-screen py-10 md:py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-2xl overflow-hidden border-2 border-gray-100">
          <div className="bg-[#0E2A21] p-10 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-500 via-amber-500 to-red-500"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white text-[#0E2A21] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl md:text-4xl font-black border-4 border-[#FBB03B] shadow-xl">
              {user.fullName.charAt(0)}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white serif">{user.fullName}</h1>
            <p className="text-[#FBB03B] text-[10px] md:text-xs font-black uppercase tracking-widest mt-2 opacity-80">
              Heritage Customer since {new Date(user.createdAt).getFullYear()}
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8 bg-white">
            <div className="grid grid-cols-1 gap-6 md:gap-8">
              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0E2A21] shrink-0">
                  <UserIcon size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.fullName}</p>
                  <p className="text-lg md:text-xl font-bold text-[#0E2A21]">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-amber-600 shrink-0">
                  <Mail size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.email}</p>
                  <p className="text-lg md:text-xl font-bold text-[#0E2A21]">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                  <Phone size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.phoneNumber}</p>
                  <p className="text-lg md:text-xl font-bold text-[#0E2A21]">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-6 group">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                  <Lock size={24} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{t.password}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg md:text-xl font-bold text-[#0E2A21] font-mono">
                      {showPassword ? user.password : '••••••••'}
                    </p>
                    <button 
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-amber-600 font-black text-[10px] uppercase hover:underline flex items-center space-x-2"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span>{showPassword ? t.hide : t.show}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-gray-100 flex justify-center">
               <button 
                onClick={handleLogout}
                className="group flex items-center space-x-4 bg-red-50 hover:bg-red-600 px-10 md:px-12 py-4 md:py-5 rounded-3xl transition-all shadow-sm border border-red-100"
               >
                 <LogOut className="text-red-600 group-hover:text-white transition-colors" size={20} md:size={24} />
                 <span className="text-red-600 group-hover:text-white font-black uppercase tracking-widest text-[11px] md:text-sm transition-colors">
                   {t.navLogout}
                 </span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
