'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import Background from '../../components/Background';
import TextType from '../../components/TextType';
import FadeInOnScroll from '../../components/FadeInOnScroll';
import { Project } from '@/lib/types';

type Language = 'nl' | 'en';

export default function ProjectDetail() {
  const params = useParams();
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
    fetchProject();
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen || !project) return;

      if (e.key === 'Escape') {
        setLightboxOpen(false);
      } else if (e.key === 'ArrowLeft' && lightboxImageIndex > 0) {
        setLightboxImageIndex(lightboxImageIndex - 1);
      } else if (e.key === 'ArrowRight' && lightboxImageIndex < (project.images || []).length - 1) {
        setLightboxImageIndex(lightboxImageIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxImageIndex, project]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const resolvedParams = await params;
      const projectSlug = resolvedParams.id as string;
      
      // Fetch all projects and find by slug
      const response = await fetch('/api/projects');
      const data = await response.json();
      const projects: Project[] = data.projects || [];
      
      const foundProject = projects.find(p => {
        const slug = p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        // Also check for legacy slugs
        if (p.id === 1 && projectSlug === 'k-imprint') return true;
        if (p.id === 2 && projectSlug === 'quality-lodgings') return true;
        return slug === projectSlug;
      });
      
      setProject(foundProject || null);
    } catch (error) {
      console.error('Error fetching project:', error);
      setProject(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
              <p className="text-[#E0E0E0] text-lg">Laden...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

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

        <main className="pt-[150px] pb-[100px]" key={contentKey}>
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
                  {/* Main Image - Square */}
                  <div className="relative">
                    <div 
                      className="rounded-2xl overflow-hidden border-2 flex items-center justify-center p-12 aspect-square w-full relative"
                      style={{
                        borderColor: project.colors?.border || '#AA61FF',
                        backgroundColor: project.colors?.background || '#1a1a2e'
                      }}
                    >
                      {(project.images || [])[0] && (
                        <img 
                          src={(project.images || [])[0]} 
                          alt={`${project.title}`}
                          className="max-w-full max-h-full object-contain transition-opacity duration-300 cursor-pointer hover:opacity-90"
                          onClick={() => {
                            setLightboxImageIndex(0);
                            setLightboxOpen(true);
                          }}
                        />
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
                          borderColor: project.colors?.border || '#AA61FF',
                          backgroundColor: project.colors?.background || '#1a1a2e'
                        }}
                      >
                        {(project.images || [])[1] ? (
                          <img 
                            src={(project.images || [])[1]} 
                            alt={`${project.title} 2`}
                            className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              setLightboxImageIndex(1);
                              setLightboxOpen(true);
                            }}
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
                          borderColor: project.colors?.border || '#AA61FF',
                          backgroundColor: project.colors?.background || '#1a1a2e'
                        }}
                      >
                        {(project.images || [])[2] ? (
                          <img 
                            src={(project.images || [])[2]} 
                            alt={`${project.title} 3`}
                            className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => {
                              setLightboxImageIndex(2);
                              setLightboxOpen(true);
                            }}
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
                          borderColor: project.colors?.border || '#AA61FF',
                          backgroundColor: project.colors?.background || '#1a1a2e'
                        }}
                      >
                        {(project.images || [])[3] ? (
                        <img 
                          src={(project.images || [])[3]} 
                          alt={`${project.title} 4`}
                          className="max-w-full max-h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => {
                            setLightboxImageIndex(3);
                            setLightboxOpen(true);
                          }}
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
              <div className="col-span-12 mb-8">
                <FadeInOnScroll delay={200}>
                  <div className="flex items-center gap-4">
                    <h1 className="text-[#AA61FF] text-[48px] font-semibold min-h-[58px]">
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
                    {project.status === 'in-progress' && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-[#AA61FF] animate-pulse"></span>
                        {language === 'nl' ? 'In ontwikkeling' : 'In progress'}
                      </span>
                    )}
                    {project.status === 'coming-soon' && (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40 backdrop-blur-sm">
                        {language === 'nl' ? 'Binnenkort' : 'Coming soon'}
                      </span>
                    )}
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Left: Long Description - 6 columns */}
              <div className="col-span-12 lg:col-span-7">
                <FadeInOnScroll delay={250}>
                  <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20">
                    <div className="text-[#E0E0E0] text-[18px] leading-relaxed space-y-4">
                      {(() => {
                        const text = project.longDescription?.[language] || project.description[language];
                        // Split text into paragraphs (on double newlines or multiple spaces)
                        const paragraphs = text.split(/\n\n+/).filter(p => p.trim());
                        // If no double newlines, split on sentences
                        if (paragraphs.length === 1) {
                          const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/).filter(s => s.trim());
                          return sentences.map((sentence, index) => (
                            <p key={index} className="mb-4 last:mb-0">
                              {isMounted ? (
                                <TextType 
                                  text={sentence.trim()}
                                  typingSpeed={10}
                                  showCursor={false}
                                  loop={false}
                                  className="text-[#E0E0E0] text-[18px]"
                                  as="span"
                                />
                              ) : (
                                sentence.trim()
                              )}
                            </p>
                          ));
                        }
                        // Render paragraphs
                        return paragraphs.map((paragraph, index) => (
                          <p key={index} className="mb-4 last:mb-0">
                            {isMounted ? (
                              <TextType 
                                text={paragraph.trim()}
                                typingSpeed={10}
                                showCursor={false}
                                loop={false}
                                className="text-[#E0E0E0] text-[18px]"
                                as="span"
                              />
                            ) : (
                              paragraph.trim()
                            )}
                          </p>
                        ));
                      })()}
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>

              {/* Right: Project Details - 5 columns */}
              <div className="col-span-12 lg:col-span-5">
                <FadeInOnScroll delay={300}>
                  <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20 space-y-6">
                    {/* Role */}
                    <div>
                      <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-3">
                        {language === 'nl' ? 'Rol' : 'Role'}
                      </h3>
                      <p className="text-[#E0E0E0] text-[16px] leading-relaxed">
                        {project.role?.[language] || '-'}
                      </p>
                    </div>

                    {/* Year */}
                    <div>
                      <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-3">
                        {language === 'nl' ? 'Jaar' : 'Year'}
                      </h3>
                      <p className="text-[#E0E0E0] text-[16px]">
                        {project.year}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-4">
                        {language === 'nl' ? 'Technologieën' : 'Technologies'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies || []).map((tech, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1.5 rounded-full text-[14px] font-medium backdrop-blur-sm bg-[#AA61FF]/10 text-[#AA61FF] border border-[#AA61FF]/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div className="pt-4 space-y-3">
                      {project.link && (
                        <a 
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#AA61FF] text-white font-semibold hover:bg-[#8844FF] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#AA61FF]/20 w-full justify-center"
                        >
                          {language === 'nl' ? 'Bekijk Project' : 'View Project'}
                          <span>→</span>
                        </a>
                      )}
                      {(project.figmaLink && project.technologies?.some(tech => tech.toLowerCase().includes('figma'))) || project.githubLink ? (
                        <div className="flex gap-3">
                          {project.figmaLink && project.technologies?.some(tech => tech.toLowerCase().includes('figma')) && (
                            <a 
                              href={project.figmaLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a0a1e] text-white font-semibold border border-[#AA61FF]/40 hover:border-[#AA61FF] hover:bg-[#AA61FF]/10 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#AA61FF]/10 flex-1 justify-center"
                            >
                              <svg width="20" height="20" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 28.5c0-5.247-4.253-9.5-9.5-9.5S0 23.253 0 28.5 4.253 38 9.5 38 19 33.747 19 28.5z" fill="#0ACF83"/>
                                <path d="M38 9.5C38 4.253 33.747 0 28.5 0S19 4.253 19 9.5s4.253 9.5 9.5 9.5S38 14.747 38 9.5z" fill="#A259FF"/>
                                <path d="M0 47.5C0 52.747 4.253 57 9.5 57S19 52.747 19 47.5V38H9.5C4.253 38 0 42.253 0 47.5z" fill="#F24E1E"/>
                                <path d="M19 0v19h9.5C33.747 19 38 14.747 38 9.5S33.747 0 28.5 0H19z" fill="#FF7262"/>
                                <path d="M0 28.5C0 23.253 4.253 19 9.5 19H19v19H9.5C4.253 38 0 33.747 0 28.5z" fill="#1ABCFE"/>
                              </svg>
                              {language === 'nl' ? 'Figma' : 'Figma'}
                            </a>
                          )}
                          {project.githubLink && (
                            <a 
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0a0a1e] text-white font-semibold border border-[#AA61FF]/40 hover:border-[#AA61FF] hover:bg-[#AA61FF]/10 transition-all duration-300 hover:scale-105 shadow-lg shadow-[#AA61FF]/10 flex-1 justify-center"
                            >
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              {language === 'nl' ? 'GitHub' : 'GitHub'}
                            </a>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && project && (project.images || []).length > 0 && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-[#AA61FF]/20 hover:bg-[#AA61FF]/40 border border-[#AA61FF]/40 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Sluiten"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            {/* Previous Button */}
            {lightboxImageIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(lightboxImageIndex - 1);
                }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-[#AA61FF]/20 hover:bg-[#AA61FF]/40 border border-[#AA61FF]/40 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Vorige afbeelding"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
            )}

            {/* Next Button */}
            {lightboxImageIndex < (project.images || []).length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex(lightboxImageIndex + 1);
                }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-[#AA61FF]/20 hover:bg-[#AA61FF]/40 border border-[#AA61FF]/40 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Volgende afbeelding"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            )}

            {/* Image */}
            <div 
              className="w-full h-full flex items-center justify-center p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={(project.images || [])[lightboxImageIndex]} 
                alt={`${project.title} ${lightboxImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-[#AA61FF]/20 backdrop-blur-sm border border-[#AA61FF]/40 text-white text-sm">
              {lightboxImageIndex + 1} / {(project.images || []).length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

