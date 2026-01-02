
import React from 'react';
import { Language } from '../types';

interface Props {
  current: Language;
  onChange: (lang: Language) => void;
}

const LanguageToggle: React.FC<Props> = ({ current, onChange }) => {
  return (
    <div className="flex space-x-2 items-center bg-gray-100 rounded-full p-1 border">
      <button
        onClick={() => onChange('en')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          current === 'en' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onChange('am')}
        className={`px-3 py-1 text-xs font-medium rounded-full transition-all ${
          current === 'am' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        አማ
      </button>
    </div>
  );
};

export default LanguageToggle;
