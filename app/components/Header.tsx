'use client';

import { useState } from 'react';
import TextType from './TextType';

type Language = 'nl' | 'en';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  hasLoadedOnce: boolean;
  currentPage?: 'home' | 'about' | 'projects' | 'contact';
}

const translations = {
  nl: {
    home: 'Home',
    aboutMe: 'Over Mij',
    projects: 'Projecten',
    contactMe: 'Contact',
  },
  en: {
    home: 'Home',
    aboutMe: 'About Me',
    projects: 'Projects',
    contactMe: 'Contact Me',
  },
};

export default function Header({ language, setLanguage, hasLoadedOnce, currentPage = 'home' }: HeaderProps) {
  const t = translations[language];

  return (
    <header className="absolute top-[50px] left-0 right-0 z-20">
      <div className="container">
        <div className="flex items-center justify-between text-[20px] font-semibold">
          {/* Logo */}
          <div className="text-[#AA61FF] font-black shrink-0 shine-effect">
            <a href="/" className="text-[#AA61FF] font-black text-[20px]">
              JvT
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center justify-center space-x-[75px] flex-1">
            <a 
              href="/" 
              className={`pb-[2px] transition-all duration-300 whitespace-nowrap border-b-2 ${
                currentPage === 'home' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'home' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.home}</span>
            </a>
            <a 
              href="/about" 
              className={`pb-[2px] transition-all duration-300 whitespace-nowrap border-b-2 ${
                currentPage === 'about' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'about' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.aboutMe}</span>
            </a>
            <a 
              href="/projects" 
              className={`pb-[2px] transition-all duration-300 whitespace-nowrap border-b-2 ${
                currentPage === 'projects' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'projects' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.projects}</span>
            </a>
            <a 
              href="/contact" 
              className={`pb-[2px] transition-all duration-300 whitespace-nowrap border-b-2 ${
                currentPage === 'contact' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'contact' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.contactMe}</span>
            </a>
          </nav>
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-1 shrink-0">
            <button 
              onClick={() => setLanguage('en')}
              className={`transition-all duration-300 border-b-2 pb-[2px] font-semibold text-[20px] ${
                language === 'en' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              EN
            </button>
            <span className="text-white">/</span>
            <button 
              onClick={() => setLanguage('nl')}
              className={`transition-all duration-300 border-b-2 pb-[2px] font-semibold text-[20px] ${
                language === 'nl' 
                  ? 'text-[#AA61FF] border-[#AA61FF] shine-effect' 
                  : 'text-white border-transparent hover:text-[#AA61FF] hover:border-[#AA61FF]'
              }`}
            >
              NL
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

