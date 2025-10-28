'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Background from '../../components/Background';
import TextType from '../../components/TextType';
import FadeInOnScroll from '../../components/FadeInOnScroll';

type Language = 'nl' | 'en';

interface ProjectDetail {
  id: string;
  title: string;
  description: {
    nl: string;
    en: string;
  };
  longDescription: {
    nl: string;
    en: string;
  };
  images: string[];
  technologies: string[];
  role: {
    nl: string;
    en: string;
  };
  year: string;
  link?: string;
  colors: {
    border: string;
    background: string;
    title: string;
    description: string;
  };
}

const projectsData: { [key: string]: ProjectDetail } = {
  'k-imprint': {
    id: 'k-imprint',
    title: 'K-imprint',
    description: {
      nl: 'Een Nederlands webshop platform voor gepersonaliseerde kleding en accessoires met lokaal design.',
      en: 'A Dutch webshop platform for personalized clothing and accessories with local design.'
    },
    longDescription: {
      nl: 'K-imprint is een volledig functionele webshop gebouwd met moderne webtechnologieën. Het platform biedt gebruikers de mogelijkheid om gepersonaliseerde kleding en accessoires te ontwerpen en te bestellen. Met een intuïtieve interface en real-time preview functionaliteit.',
      en: 'K-imprint is a fully functional webshop built with modern web technologies. The platform offers users the ability to design and order personalized clothing and accessories. With an intuitive interface and real-time preview functionality.'
    },
    images: ['/images/K-imprint logo.avif'],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Shopify'],
    role: {
      nl: 'Full-Stack Development & Design',
      en: 'Full-Stack Development & Design'
    },
    year: '2024',
    link: 'https://k-imprint.nl',
    colors: {
      border: '#61554F',
      background: '#D9C1B5',
      title: '#0a0a0a',
      description: '#1a1a1a'
    }
  },
  'quality-lodgings': {
    id: 'quality-lodgings',
    title: 'Quality Lodgings',
    description: {
      nl: 'UX redesign voor een luxe accommodatie platform met focus op gebruiksvriendelijkheid en moderne interface.',
      en: 'UX redesign for a luxury accommodation platform with focus on user-friendliness and modern interface.'
    },
    longDescription: {
      nl: 'Quality Lodgings redesign project waarbij ik de volledige gebruikerservaring heb herontworpen. Focus lag op het verbeteren van de boekingsstroom en het creëren van een moderne, elegante interface die de premium uitstraling van het merk weerspiegelt.',
      en: 'Quality Lodgings redesign project where I completely redesigned the user experience. Focus was on improving the booking flow and creating a modern, elegant interface that reflects the premium look and feel of the brand.'
    },
    images: ['/images/logo-ql.jpg'],
    technologies: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
    role: {
      nl: 'UX/UI Design',
      en: 'UX/UI Design'
    },
    year: '2024',
    colors: {
      border: '#2a2a2a',
      background: '#0a0a0a',
      title: '#ffffff',
      description: '#e0e0e0'
    }
  }
};

export default function ProjectDetail() {
  const params = useParams();
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  const projectId = params.id as string;
  const project = projectsData[projectId];

  if (!project) {
    return (
      <div className="min-h-screen text-white relative">
        <Background />
        <div className="relative z-10">
          <Header
            language={language}
            setLanguage={setLanguage}
            hasLoadedOnce={hasLoadedOnce}
            currentPage="projects"
          />
          <main className="pt-[150px] pb-20">
            <div className="content-container text-center">
              <h1 className="text-[48px] font-semibold text-[#AA61FF]">Project niet gevonden</h1>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white relative">
      <Background />

      <div className="relative z-10">
        <Header
          language={language}
          setLanguage={setLanguage}
          hasLoadedOnce={hasLoadedOnce}
          currentPage="projects"
        />

        <main className="pt-[150px] pb-20" key={contentKey}>
          <div className="content-container">
            {/* Back Button */}
            <div className="mb-8">
              <a 
                href="/projects"
                className="text-[#AA61FF] hover:text-[#8844FF] transition-colors duration-300 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"/>
                </svg>
                {language === 'nl' ? 'Terug naar projecten' : 'Back to projects'}
              </a>
            </div>

            {/* Images Grid - Full Width */}
            <div className="grid grid-cols-12 gap-8 mb-12">
              {/* Left Side - Main Image */}
              <div className="col-span-12 lg:col-span-6">
                <FadeInOnScroll>
                  {/* Main Image Carousel - Square */}
                  <div className="relative">
                    <div 
                      className="rounded-2xl overflow-hidden border-2 flex items-center justify-center p-12 aspect-square w-full relative"
                      style={{
                        borderColor: project.colors.border,
                        backgroundColor: project.colors.background
                      }}
                    >
                      {project.images[currentImageIndex] && (
                        <img 
                          src={project.images[currentImageIndex]} 
                          alt={`${project.title} ${currentImageIndex + 1}`}
                          className="max-w-full max-h-full object-contain transition-opacity duration-300"
                        />
                      )}

                      {/* Carousel Dots - Inside Image Box */}
                      {project.images.length > 1 && (
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className="transition-all duration-300 hover:scale-110"
                              aria-label={`Ga naar afbeelding ${index + 1}`}
                            >
                              <div 
                                className="rounded-full transition-all duration-300"
                                style={{
                                  width: currentImageIndex === index ? '12px' : '8px',
                                  height: currentImageIndex === index ? '12px' : '8px',
                                  backgroundColor: currentImageIndex === index ? '#0a0a0a' : 'transparent',
                                  border: '2px solid #0a0a0a'
                                }}
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Right Side - 3 Image Boxes */}
              <div className="col-span-12 lg:col-span-6">
                <FadeInOnScroll delay={100}>
                  <div className="flex flex-col aspect-square w-full">
                    {/* Top Row - 2 Images Side by Side */}
                    <div className="grid grid-cols-2 gap-6 h-[calc(50%-12px)] mb-6">
                      {/* Image Box 2 */}
                      <div 
                        className="rounded-2xl overflow-hidden border-2 flex items-center justify-center p-6 h-full"
                        style={{
                          borderColor: project.colors.border,
                          backgroundColor: project.colors.background
                        }}
                      >
                        {project.images[1] ? (
                          <img 
                            src={project.images[1]} 
                            alt={`${project.title} 2`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-[#AA61FF] text-4xl opacity-20">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="2"/>
                              <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </div>
                        )}
                      </div>

                      {/* Image Box 3 */}
                      <div 
                        className="rounded-2xl overflow-hidden border-2 flex items-center justify-center p-6 h-full"
                        style={{
                          borderColor: project.colors.border,
                          backgroundColor: project.colors.background
                        }}
                      >
                        {project.images[2] ? (
                          <img 
                            src={project.images[2]} 
                            alt={`${project.title} 3`}
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <div className="text-[#AA61FF] text-4xl opacity-20">
                            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <line x1="20" y1="20" x2="80" y2="80" stroke="currentColor" strokeWidth="2"/>
                              <line x1="80" y1="20" x2="20" y2="80" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Row - 1 Full Width Image */}
                    <div 
                      className="rounded-2xl overflow-hidden border-2 flex items-center justify-center p-8 h-[calc(50%-12px)]"
                      style={{
                        borderColor: project.colors.border,
                        backgroundColor: project.colors.background
                      }}
                    >
                      {project.images[3] ? (
                        <img 
                          src={project.images[3]} 
                          alt={`${project.title} 4`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-[#AA61FF] text-4xl opacity-20">
                          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="30" y1="30" x2="120" y2="120" stroke="currentColor" strokeWidth="2"/>
                            <line x1="120" y1="30" x2="30" y2="120" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>

            {/* Description Section - Full Width Grid */}
            <div className="grid grid-cols-12 gap-8">
              {/* Title - Full Width */}
              <div className="col-span-12">
                <FadeInOnScroll delay={200}>
                  <h1 className="text-[#AA61FF] text-[48px] font-semibold mb-6 min-h-[58px]">
                    {isMounted ? (
                      <TextType 
                        text={project.title}
                        typingSpeed={150}
                        showCursor={false}
                        loop={false}
                        className="text-[#AA61FF] text-[48px] font-semibold"
                        as="span"
                      />
                    ) : (
                      project.title
                    )}
                  </h1>
                </FadeInOnScroll>
              </div>

              {/* Left: Long Description - 6 columns */}
              <div className="col-span-12 lg:col-span-6">
                <FadeInOnScroll delay={250}>
                  <div className="text-[#E0E0E0] text-[18px] leading-relaxed h-[280px]">
                    {isMounted ? (
                      <TextType 
                        text={project.longDescription[language]}
                        typingSpeed={10}
                        showCursor={false}
                        loop={false}
                        className="text-[#E0E0E0] text-[18px]"
                        as="span"
                      />
                    ) : (
                      project.longDescription[language]
                    )}
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Right: Project Details - 6 columns */}
              <div className="col-span-12 lg:col-span-6">
                <FadeInOnScroll delay={300}>
                  <div className="space-y-6 h-[280px]">
                    {/* Role */}
                    <div>
                      <h3 className="text-white text-[20px] font-semibold mb-2">
                        {language === 'nl' ? 'Rol' : 'Role'}
                      </h3>
                      <p className="text-[#E0E0E0] text-[16px]">
                        {project.role[language]}
                      </p>
                    </div>

                    {/* Year */}
                    <div>
                      <h3 className="text-white text-[20px] font-semibold mb-2">
                        {language === 'nl' ? 'Jaar' : 'Year'}
                      </h3>
                      <p className="text-[#E0E0E0] text-[16px]">
                        {project.year}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-white text-[20px] font-semibold mb-3">
                        {language === 'nl' ? 'Technologieën' : 'Technologies'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 rounded-full text-[14px] font-medium"
                            style={{
                              backgroundColor: project.colors.background,
                              color: project.colors.title,
                              border: `1px solid ${project.colors.border}`
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-8 py-3 rounded-full bg-[#AA61FF] text-white font-semibold hover:bg-[#8844FF] transition-all duration-300 hover:scale-105"
                      >
                        {language === 'nl' ? 'Bekijk Project' : 'View Project'}
                      </a>
                    )}
                  </div>
                </FadeInOnScroll>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

