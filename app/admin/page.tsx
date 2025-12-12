'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import ProjectManager from '../components/ProjectManager';

type Language = 'nl' | 'en';

export default function AdminPage() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);

  useEffect(() => {
    setHasLoadedOnce(true);
  }, []);

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      
      <div className="relative z-10">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          hasLoadedOnce={hasLoadedOnce}
          currentPage="home"
        />

        <main className="pt-[150px] pb-20">
          <div className="container">
            <h1 className="text-[#AA61FF] text-[48px] font-semibold mb-8">
              Projecten Beheer
            </h1>
            <ProjectManager />
          </div>
        </main>
      </div>
    </div>
  );
}





