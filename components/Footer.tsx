
import React from 'react';
import { Translation } from '../types';
import { Phone, Send, Mail, MapPin } from 'lucide-react';

interface Props {
  t: Translation;
}

const Footer: React.FC<Props> = ({ t }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold serif">Habesha Lbs</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving the heritage of Ethiopian fashion through authentic fabrics and contemporary designs. Every piece tells a story.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-xs text-amber-500">{t.navShop}</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Men's Wear</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Kemis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kids' Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-xs text-amber-500">Support</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Order Tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 uppercase tracking-wider text-xs text-amber-500">{t.footerContact}</h4>
            <div className="space-y-4">
              <a href="tel:+251941999176" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Phone size={18} className="text-amber-500" />
                <span>+251 941 999 176</span>
              </a>
              <a href="https://t.me/jaksen27" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
                <Send size={18} className="text-amber-500" />
                <span>@jaksen27 (Telegram)</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={18} className="text-amber-500" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:row justify-between items-center text-xs text-gray-500">
          <p>© 2024 Habesha Lbs. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
