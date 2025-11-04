'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import TextType from '../components/TextType';
import FadeInOnScroll from '../components/FadeInOnScroll';
import { Project } from '@/lib/types';

type Language = 'nl' | 'en';

export default function Projects() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTech, setFilterTech] = useState<string | null>(null);

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
    fetchProjects();
    
    // Check for tech filter in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tech = params.get('tech');
      if (tech) {
        setFilterTech(decodeURIComponent(tech));
      }
    }
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setAllProjects(data.projects || []);
      filterProjectsByTech(data.projects || [], filterTech);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setAllProjects([]);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const filterProjectsByTech = (projectsList: Project[], tech: string | null) => {
    if (!tech) {
      setProjects(projectsList);
      return;
    }
    
    const filtered = projectsList.filter(project => 
      project.technologies?.some(t => 
        t.toLowerCase().includes(tech.toLowerCase()) || 
        tech.toLowerCase().includes(t.toLowerCase())
      )
    );
    setProjects(filtered);
  };

  useEffect(() => {
    if (allProjects.length > 0) {
      filterProjectsByTech(allProjects, filterTech);
    }
  }, [filterTech, allProjects]);

  const getProjectSlug = (project: Project) => {
    if (project.id === 1) return 'k-imprint';
    if (project.id === 2) return 'quality-lodgings';
    return project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

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
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-[#AA61FF] text-[48px] font-semibold min-h-[58px]">
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
                {filterTech && (
                  <div className="flex items-center gap-3">
                    <span className="text-[#E0E0E0] text-sm">
                      {language === 'nl' ? 'Gefilterd op:' : 'Filtered by:'} <span className="text-[#AA61FF] font-semibold">{filterTech}</span>
                    </span>
                    <a 
                      href="/projects"
                      className="text-[#AA61FF] text-sm hover:text-[#8844FF] transition-colors underline"
                    >
                      {language === 'nl' ? 'Wis filter' : 'Clear filter'}
                    </a>
                  </div>
                )}
                </div>
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

              {/* Loading State */}
              {loading ? (
                <div className="col-span-12 text-center py-12">
                  <p className="text-[#E0E0E0] text-lg">Laden...</p>
                </div>
              ) : projects.length === 0 ? (
                <div className="col-span-12 text-center py-12">
                  <p className="text-[#E0E0E0] text-lg">Geen projecten gevonden</p>
                </div>
              ) : (
                /* Projects Grid */
                projects.map((project, index) => (
                  <FadeInOnScroll key={project.id} delay={index * 100} className="col-span-12 md:col-span-6">
                    <a 
                      href={`/projects/${getProjectSlug(project)}`}
                      className="block backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl overflow-hidden shadow-lg shadow-[#AA61FF]/20 group hover:scale-[1.02] transition-all duration-300"
                    >
                      {/* Project Image */}
                      <div 
                        className="relative h-48 overflow-hidden"
                        style={{
                          backgroundColor: project.colors?.background || '#0a0a0a'
                        }}
                      >
                        {project.image ? (
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-contain p-6"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-[#AA61FF] text-4xl font-black opacity-30">
                              {project.title.charAt(0)}
                            </div>
                          </div>
                        )}
                        <div 
                          className="absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: project.colors?.hoverOverlay 
                              ? `linear-gradient(to top, ${project.colors.hoverOverlay}, transparent)` 
                              : 'linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)'
                          }}
                        ></div>
                      </div>
                      
                      {/* Project Info Section */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-[#AA61FF] text-xl font-semibold group-hover:text-[#8844FF] transition-colors">
                            {isMounted ? (
                              <TextType 
                                text={project.title}
                                typingSpeed={150}
                                showCursor={false}
                                loop={false}
                                className="text-[#AA61FF] text-xl font-semibold group-hover:text-[#8844FF]"
                                as="span"
                              />
                            ) : (
                              project.title
                            )}
                          </h3>
                          {project.status === 'in-progress' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40 backdrop-blur-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#AA61FF] animate-pulse"></span>
                              {language === 'nl' ? 'In ontwikkeling' : 'In progress'}
                            </span>
                          )}
                          {project.status === 'coming-soon' && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40 backdrop-blur-sm">
                              {language === 'nl' ? 'Binnenkort' : 'Coming soon'}
                            </span>
                          )}
                        </div>
                        <p 
                          className="text-[#E0E0E0] text-[14px] leading-relaxed mb-4" 
                          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
                          {isMounted ? (
                            <TextType 
                              text={project.description[language]}
                              typingSpeed={10}
                              showCursor={false}
                              loop={false}
                              className="text-[#E0E0E0] text-[14px]"
                              as="span"
                            />
                          ) : (
                            project.description[language]
                          )}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {project.technologies?.slice(0, 3).map((tech, idx) => (
                            <span 
                              key={idx}
                              className="text-[#AA61FF] text-xs px-2 py-1 rounded-full border border-[#AA61FF]/30 bg-[#AA61FF]/10"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 3 && (
                            <span className="text-[#E0E0E0] text-xs">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </a>
                  </FadeInOnScroll>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

