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
            <a 
              href="/" 
              className="text-[#AA61FF] font-black text-[20px] select-none cursor-pointer transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(170,97,255,0.8)] inline-block"
            >
              JvT
            </a>
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center justify-center space-x-[75px] flex-1">
            <a 
              href="/" 
              className={`nav-link-border pb-[2px] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                currentPage === 'home' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'home' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.home}</span>
            </a>
            <a 
              href="/about" 
              className={`nav-link-border pb-[2px] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                currentPage === 'about' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'about' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.aboutMe}</span>
            </a>
            <a 
              href="/projects" 
              className={`nav-link-border pb-[2px] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                currentPage === 'projects' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'projects' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.projects}</span>
            </a>
            <a 
              href="/contact" 
              className={`nav-link-border pb-[2px] transition-all duration-300 whitespace-nowrap hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                currentPage === 'contact' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
              }`}
            >
              <span className={`font-semibold text-[20px] ${currentPage === 'contact' ? 'text-[#AA61FF]' : 'text-white'}`}>{t.contactMe}</span>
            </a>
          </nav>
          
          {/* Language Switcher */}
          <div className="flex items-center space-x-1 shrink-0">
            <button 
              onClick={() => setLanguage('en')}
              className={`nav-link-border transition-all duration-300 pb-[2px] font-semibold text-[20px] hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                language === 'en' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
              }`}
            >
              EN
            </button>
            <span className="text-white">/</span>
            <button 
              onClick={() => setLanguage('nl')}
              className={`nav-link-border transition-all duration-300 pb-[2px] font-semibold text-[20px] hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] ${
                language === 'nl' 
                  ? 'text-[#AA61FF] shine-effect scale-105 drop-shadow-[0_0_8px_rgba(170,97,255,0.6)] active' 
                  : 'text-white hover:text-[#AA61FF]'
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

