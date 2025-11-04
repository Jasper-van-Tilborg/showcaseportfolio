'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Background from './components/Background';
import TextType from './components/TextType';

type Language = 'nl' | 'en';

export default function NotFound() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  const translations = {
    nl: {
      title: '404',
      subtitle: 'Pagina niet gevonden',
      description: 'Oeps! De pagina die je zoekt bestaat niet of is verplaatst.',
      homeButton: 'Terug naar Home',
      projectsButton: 'Bekijk Projecten',
    },
    en: {
      title: '404',
      subtitle: 'Page not found',
      description: 'Oops! The page you are looking for does not exist or has been moved.',
      homeButton: 'Back to Home',
      projectsButton: 'View Projects',
    },
  };

  const t = translations[language];

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          hasLoadedOnce={hasLoadedOnce}
        />

        {/* Main Content */}
        <main className="flex items-center justify-center min-h-[calc(100vh-200px)] pt-[150px] pb-20">
          <div className="content-container text-center">
            {/* 404 Number */}
            <div className="mb-8">
              <h1 className="text-[180px] font-black text-[#AA61FF] leading-none select-none mb-4">
                {isMounted ? (
                  <TextType 
                    text={t.title}
                    typingSpeed={200}
                    showCursor={false}
                    loop={false}
                    className="text-[180px] font-black text-[#AA61FF]"
                    as="span"
                  />
                ) : (
                  t.title
                )}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="mb-6">
              <h2 className="text-[40px] font-semibold text-white">
                {isMounted ? (
                  <TextType 
                    text={t.subtitle}
                    typingSpeed={75}
                    showCursor={false}
                    loop={false}
                    className="text-[40px] font-semibold text-white"
                    as="span"
                  />
                ) : (
                  t.subtitle
                )}
              </h2>
            </div>

            {/* Description */}
            <div className="mb-12 max-w-2xl mx-auto">
              <p className="text-[18px] text-[#E0E0E0] leading-relaxed">
                {isMounted ? (
                  <TextType 
                    text={t.description}
                    typingSpeed={30}
                    showCursor={false}
                    loop={false}
                    className="text-[18px] text-[#E0E0E0]"
                    as="span"
                  />
                ) : (
                  t.description
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="/"
                className="bg-[#AA61FF] hover:bg-[#8844FF] text-white px-8 py-4 rounded-xl font-semibold text-[18px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(170,97,255,0.6)] shine-effect"
              >
                {isMounted ? (
                  <TextType 
                    text={t.homeButton}
                    typingSpeed={50}
                    showCursor={false}
                    loop={false}
                    className="text-white font-semibold text-[18px]"
                    as="span"
                  />
                ) : (
                  t.homeButton
                )}
              </a>
              <a
                href="/projects"
                className="border-2 border-[#AA61FF] text-[#AA61FF] hover:bg-[#AA61FF] hover:text-white px-8 py-4 rounded-xl font-semibold text-[18px] transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_20px_rgba(170,97,255,0.6)] shine-effect"
              >
                {isMounted ? (
                  <TextType 
                    text={t.projectsButton}
                    typingSpeed={50}
                    showCursor={false}
                    loop={false}
                    className="font-semibold text-[18px]"
                    as="span"
                  />
                ) : (
                  t.projectsButton
                )}
              </a>
            </div>

            {/* Decorative Element */}
            <div className="mt-16 flex justify-center">
              <svg 
                width="200" 
                height="100" 
                viewBox="0 0 200 100" 
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-20"
              >
                <text 
                  x="100" 
                  y="70" 
                  fontSize="80" 
                  fontWeight="900" 
                  textAnchor="middle"
                  fontFamily="var(--font-poppins), Poppins, sans-serif"
                  fill="#AA61FF"
                >
                  ?
                </text>
              </svg>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}



