'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import TextType from '../components/TextType';
import FadeInOnScroll from '../components/FadeInOnScroll';

type Language = 'nl' | 'en';

interface Project {
  id: number;
  title: string;
  description: {
    nl: string;
    en: string;
  };
  image?: string; // Path to project image
  link?: string;
  colors?: {
    border: string;
    background: string;
    title: string;
    description: string;
    gradient: string;
  };
}

export default function Projects() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  const projects: Project[] = [
    {
      id: 1,
      title: 'K-imprint',
      description: {
        nl: 'Een Nederlands webshop platform voor gepersonaliseerde kleding en accessoires met lokaal design.',
        en: 'A Dutch webshop platform for personalized clothing and accessories with local design.'
      },
      image: '/images/K-imprint logo.avif',
      link: 'https://k-imprint.nl'
    },
    {
      id: 2,
      title: 'Quality Lodgings',
      description: {
        nl: 'UX redesign voor een luxe accommodatie platform met focus op gebruiksvriendelijkheid en moderne interface.',
        en: 'UX redesign for a luxury accommodation platform with focus on user-friendliness and modern interface.'
      },
      image: '/images/logo-ql.jpg',
      link: '#',
      colors: {
        border: '#2a2a2a',
        background: '#0a0a0a',
        title: '#ffffff',
        description: '#e0e0e0',
        gradient: '#0a0a0a'
      }
    },
  ];

  return (
    <div className="min-h-screen text-white relative">
      <Background />

      {/* Main Content Wrapper */}
      <div className="relative z-10">
        <Header
          language={language}
          setLanguage={setLanguage}
          hasLoadedOnce={hasLoadedOnce}
          currentPage="projects"
        />

        {/* Main Content */}
        <main className="pt-[150px] pb-20" key={contentKey}>
          <div className="content-container">
            <div className="grid grid-cols-12 gap-6">
              {/* Page Header */}
              <div className="col-span-12 mb-16">
                <h1 className="text-[#AA61FF] text-[48px] font-semibold mb-8 min-h-[58px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' ? 'Projecten Gallerij' : 'Projects Gallery'}
                    typingSpeed={200}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[48px] font-semibold"
                    as="span"
                  />
                ) : (
                  language === 'nl' ? 'Projecten Gallerij' : 'Projects Gallery'
                )}
              </h1>
              <div className="text-[#E0E0E0] text-[18px] leading-relaxed max-w-5xl h-[120px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' 
                      ? 'Hier vind je een overzicht van mijn recente projecten. Van webdesign tot interactieve applicaties, elk project vertegenwoordigt mijn toewijding aan kwaliteit, creativiteit en gebruiksvriendelijkheid. Ontdek hoe ik design en development combineer om unieke digitale ervaringen te creëren.'
                      : 'Here you will find an overview of my recent projects. From web design to interactive applications, each project represents my commitment to quality, creativity and user-friendliness. Discover how I combine design and development to create unique digital experiences.'}
                    typingSpeed={10}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0] text-[18px]"
                    as="span"
                  />
                ) : (
                  language === 'nl' 
                    ? 'Hier vind je een overzicht van mijn recente projecten. Van webdesign tot interactieve applicaties, elk project vertegenwoordigt mijn toewijding aan kwaliteit, creativiteit en gebruiksvriendelijkheid. Ontdek hoe ik design en development combineer om unieke digitale ervaringen te creëren.'
                    : 'Here you will find an overview of my recent projects. From web design to interactive applications, each project represents my commitment to quality, creativity and user-friendliness. Discover how I combine design and development to create unique digital experiences.'
                )}
              </div>
              </div>

              {/* Projects Grid */}
              {projects.map((project, index) => (
                <FadeInOnScroll key={project.id} delay={index * 100} className="col-span-12 md:col-span-6">
                  <div className="project-card group cursor-pointer">
                    <a 
                      href={project.link || '#'} 
                      className="block"
                      target={project.link ? '_blank' : undefined}
                      rel={project.link ? 'noopener noreferrer' : undefined}
                    >
                      {/* Project Card */}
                      <div 
                        className="rounded-2xl overflow-hidden mb-6 border-2 bg-[#0a0a0a] h-[380px] flex flex-col"
                        style={{ 
                          borderColor: project.colors?.border || '#61554F'
                        }}
                      >
                        {/* Project Image */}
                        <div 
                          className="relative h-[200px] overflow-hidden flex items-center justify-center p-8"
                          style={{
                            backgroundColor: project.colors?.background || '#D9C1B5'
                          }}
                        >
                          {project.image ? (
                            <img 
                              src={project.image} 
                              alt={project.title}
                              className="max-w-full max-h-full object-contain"
                            />
                          ) : (
                            /* Gradient Background when no image */
                            <div 
                              className="w-full h-full"
                              style={{
                                background: `linear-gradient(to bottom, #0a0a0a, #0a0a0a, ${project.colors?.gradient || '#D9C1B5'})`
                              }}
                            ></div>
                          )}
                        </div>
                        
                        {/* Project Info Section */}
                        <div 
                          className="p-6 flex-1 border-t-2"
                          style={{ 
                            backgroundColor: project.colors?.background || '#D9C1B5',
                            borderColor: project.colors?.border || '#61554F'
                          }}
                        >
                          <h3 
                            className="text-[28px] font-semibold mb-2 min-h-[34px]"
                            style={{ 
                              color: project.colors?.title || '#0a0a0a'
                            }}
                          >
                            {isMounted ? (
                              <TextType 
                                text={project.title}
                                typingSpeed={150}
                                showCursor={false}
                                loop={false}
                                className="text-[28px] font-semibold"
                                as="span"
                                style={{ 
                                  color: project.colors?.title || '#0a0a0a'
                                }}
                              />
                            ) : (
                              project.title
                            )}
                          </h3>
                          <div 
                            className="text-[16px] leading-relaxed h-[72px]"
                            style={{ 
                              color: project.colors?.description || '#1a1a1a'
                            }}
                          >
                            {isMounted ? (
                              <TextType 
                                text={project.description[language]}
                                typingSpeed={10}
                                showCursor={false}
                                loop={false}
                                className="text-[16px]"
                                as="span"
                                style={{ 
                                  color: project.colors?.description || '#1a1a1a'
                                }}
                              />
                            ) : (
                              project.description[language]
                            )}
                          </div>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-[#AA61FF]/0 group-hover:bg-[#AA61FF]/10 transition-all duration-300 pointer-events-none"></div>
                      </div>
                    </a>
                  </div>
                </FadeInOnScroll>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

