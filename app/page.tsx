'use client';

import { useEffect, useState } from 'react';
import TextType from './components/TextType';
import Header from './components/Header';
import Background from './components/Background';

type Language = 'nl' | 'en';

const translations = {
  nl: {
    greeting: 'Hey, ik ben Jasper',
    description: 'Ik ben een Designer & Front-End Developer en dit is mijn portfolio',
  },
  en: {
    greeting: 'Hey, I\'m Jasper',
    description: 'I am a Designer & Front-End Developer and this is my portfolio',
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>('nl');
  const [animationKey, setAnimationKey] = useState(0);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [language]);

  const t = translations[language];

  return (
    <div className="min-h-screen text-white relative flex flex-col">
      <Background showFootballField={true} />
      
      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          hasLoadedOnce={hasLoadedOnce}
          currentPage="home"
        />

        {/* Main Content / Hero Section */}
        <main className="flex-1 flex items-center justify-center">
          {isMounted ? (
            <div className="text-center w-full relative z-10" key={animationKey}>
              <div className="container">
                {/* Large Logo */}
                <h1 className="mb-6 flex justify-center select-none">
                  <svg width="300" height="150" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg" style={{ animation: 'shine 1s ease-out 5s forwards' }} className="select-none">
                    {/* Stroke outline layer */}
                    <text 
                      x="150" 
                      y="110" 
                      fontSize="120" 
                      fontWeight="900" 
                      textAnchor="middle"
                      fontFamily="var(--font-poppins), Poppins, sans-serif"
                      className="svg-text-animate select-none"
                      fill="none"
                    >
                      JvT
                    </text>
                    {/* Fill layer that fills from bottom to top */}
                    <text 
                      x="150" 
                      y="110" 
                      fontSize="120" 
                      fontWeight="900" 
                      textAnchor="middle"
                      fontFamily="var(--font-poppins), Poppins, sans-serif"
                      className="svg-text-fill select-none"
                    >
                      JvT
                    </text>
                  </svg>
                </h1>
                
                {/* Greeting */}
                <h2 className="text-3xl font-bold text-white mb-4">
                  <TextType 
                    text={t.greeting}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={false}
                    loop={false}
                    className="text-3xl font-bold text-white"
                  />
                </h2>
                
                {/* Description */}
                <div className="text-xl text-[#E0E0E0] leading-relaxed mx-auto">
                  <TextType 
                    text={t.description}
                    typingSpeed={50}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    loop={false}
                    className="text-xl text-[#E0E0E0]"
                    hideCursorWhileTyping={false}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center w-full relative z-10">
              <div className="container">
                {/* Static placeholder to prevent layout shift */}
                <h1 className="mb-6 flex justify-center text-[120px] font-black text-[#AA61FF] select-none" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif', lineHeight: '150px' }}>
                  JvT
                </h1>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {t.greeting}
                </h2>
                <div className="text-xl text-[#E0E0E0] leading-relaxed mx-auto">
                  {t.description}
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="absolute bottom-[50px] left-0 right-0 z-20">
          <div className="container">
            <div className="flex items-center justify-center">
              <div className="text-[#E0E0E0]">
                {isMounted ? (
                  <TextType 
                    text={`© ${new Date().getFullYear()} JvT`}
                    typingSpeed={60}
                    pauseDuration={1500}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0]"
                  />
                ) : (
                  <span>© {new Date().getFullYear()} JvT</span>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
