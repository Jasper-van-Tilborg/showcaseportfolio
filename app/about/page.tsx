'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import TextType from '../components/TextType';
import FadeInOnScroll from '../components/FadeInOnScroll';
import { Project } from '@/lib/types';

type Language = 'nl' | 'en';

export default function About() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const getProjectsByTechnology = (tech: string): Project[] => {
    const techLower = tech.toLowerCase();
    return projects.filter(project => 
      project.technologies?.some(t => {
        const tLower = t.toLowerCase();
        // Exact match or contains match
        return tLower === techLower || 
               tLower.includes(techLower) || 
               techLower.includes(tLower) ||
               // Special cases
               (techLower === 'react' && (tLower.includes('react') || tLower === 'next.js')) ||
               (techLower === 'next.js' && (tLower.includes('next') || tLower.includes('react'))) ||
               (techLower === 'ui/ux design' && (tLower.includes('ui') || tLower.includes('ux') || tLower.includes('design'))) ||
               (techLower === 'prototyping' && tLower.includes('prototyp'));
      })
    );
  };

  const getProjectLink = (tech: string): string => {
    const techParam = encodeURIComponent(tech);
    return `/projects?tech=${techParam}`;
  };

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      
      {/* Main Content Wrapper */}
      <div className="relative z-10">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          hasLoadedOnce={hasLoadedOnce}
          currentPage="about"
        />

          {/* Main Content */}
          <main className="pt-[150px] pb-20" key={contentKey}>
            <div className="content-container">
              <div className="grid grid-cols-12 gap-6">
                {/* Hero Section with Image and Intro */}
                <FadeInOnScroll className="col-span-12 mb-20">
                  <div className="grid grid-cols-12 gap-12 items-center">
                    {/* Profile Image Placeholder - Left Side */}
                    <div className="col-span-12 md:col-span-5 lg:col-span-4">
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#AA61FF] via-[#8844FF] to-[#AA61FF] rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <div className="relative bg-gradient-to-br from-[#AA61FF]/30 via-[#AA61FF]/10 to-[#1a1a2e] rounded-3xl aspect-[3/4] overflow-hidden border-2 border-[#AA61FF]/40 flex items-center justify-center backdrop-blur-sm">
                          <div className="absolute inset-0 bg-gradient-to-br from-[#AA61FF]/20 via-transparent to-transparent"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/80 via-transparent to-transparent"></div>
                          <div className="relative z-10 text-center px-8 transform group-hover:scale-105 transition-transform duration-500">
                            <div className="text-[#AA61FF] text-7xl md:text-8xl font-black mb-6 opacity-80 drop-shadow-[0_0_20px_rgba(170,97,255,0.5)]">JvT</div>
                            <div className="w-32 h-1.5 bg-gradient-to-r from-transparent via-[#AA61FF]/60 to-transparent mx-auto rounded-full shadow-[0_0_10px_rgba(170,97,255,0.5)]"></div>
                          </div>
                          <div className="absolute top-4 right-4 w-3 h-3 bg-[#AA61FF]/40 rounded-full animate-pulse"></div>
                          <div className="absolute bottom-4 left-4 w-2 h-2 bg-[#AA61FF]/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Intro Text - Right Side */}
                    <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col justify-center space-y-6">
                      {isMounted ? (
                        <>
                          <div>
                            <div className="text-[#AA61FF] text-[24px] md:text-[28px] font-semibold mb-4 tracking-wide">
                              <TextType 
                                text={language === 'nl' ? 'Hey,' : 'Hey,'}
                                typingSpeed={75}
                                showCursor={false}
                                loop={false}
                                className="text-[#AA61FF] text-[24px] md:text-[28px] font-semibold"
                                as="span"
                              />
                            </div>
                            <div className="text-[#E0E0E0] text-[24px] md:text-[32px] leading-tight mb-4 font-medium">
                              {language === 'nl' ? (
                                <TextType 
                                  text="Mijn naam is Jasper van Tilborg"
                                  typingSpeed={50}
                                  showCursor={false}
                                  loop={false}
                                  className="text-[#E0E0E0] text-[24px] md:text-[32px]"
                                  as="span"
                                />
                              ) : (
                                <TextType 
                                  text="My name is Jasper van Tilborg"
                                  typingSpeed={50}
                                  showCursor={false}
                                  loop={false}
                                  className="text-[#E0E0E0] text-[24px] md:text-[32px]"
                                  as="span"
                                />
                              )}
                            </div>
                            <div className="text-[#E0E0E0] text-[20px] md:text-[24px] leading-relaxed mb-4">
                              {language === 'nl' ? (
                                <TextType 
                                  text="Ik ben een Designer & Front-End Developer uit"
                                  typingSpeed={50}
                                  showCursor={false}
                                  loop={false}
                                  className="text-[#E0E0E0] text-[20px] md:text-[24px]"
                                  as="span"
                                />
                              ) : (
                                <TextType 
                                  text="I am a Designer & Front-End Developer from"
                                  typingSpeed={50}
                                  showCursor={false}
                                  loop={false}
                                  className="text-[#E0E0E0] text-[20px] md:text-[24px]"
                                  as="span"
                                />
                              )}
                            </div>
                            <div className="text-[#AA61FF] text-[24px] md:text-[28px] leading-relaxed font-semibold inline-flex items-center gap-3">
                              <TextType 
                                text={language === 'nl' ? 'Gilze, Nederland' : 'Gilze, Netherlands'}
                                typingSpeed={50}
                                showCursor={false}
                                loop={false}
                                className="text-[#AA61FF] text-[24px] md:text-[28px] font-semibold"
                                as="span"
                              />
                              <div className="w-16 h-0.5 bg-[#AA61FF]/60"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-[#AA61FF] text-[24px] md:text-[28px] font-semibold mb-4 tracking-wide">
                              {language === 'nl' ? 'Hey,' : 'Hey,'}
                            </p>
                            <p className="text-[#E0E0E0] text-[24px] md:text-[32px] leading-tight mb-4 font-medium">
                              Mijn naam is Jasper van Tilborg
                            </p>
                            <p className="text-[#E0E0E0] text-[20px] md:text-[24px] leading-relaxed mb-4">
                              Ik ben een Designer & Front-End Developer uit
                            </p>
                            <div className="text-[#AA61FF] text-[24px] md:text-[28px] leading-relaxed font-semibold inline-flex items-center gap-3">
                              Gilze, Nederland
                              <span className="w-16 h-0.5 bg-[#AA61FF]/60 block"></span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </FadeInOnScroll>

                {/* Over Mij Section */}
                <FadeInOnScroll className="col-span-12">
                  <div className="mb-20">
              <h2 className="text-[#AA61FF] text-[40px] font-semibold mb-8 min-h-[48px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' ? 'Over Mij' : 'About Me'}
                    typingSpeed={200}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[40px] font-semibold"
                    as="span"
                  />
                ) : (
                  language === 'nl' ? 'Over Mij' : 'About Me'
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-6 shadow-lg shadow-[#AA61FF]/20">
                  <div className="text-[#E0E0E0] text-[18px] leading-relaxed">
                    {isMounted ? (
                      <TextType 
                        text={language === 'nl' 
                          ? 'Ik ben een Designer & Front-End Developer uit Gilze met een passie voor het creëren van mooie en functionele websites. Met een achtergrond in Media Design, combineer ik design en code om gebruiksvriendelijke digitale ervaringen te maken.'
                          : 'I am a Designer & Front-End Developer from Gilze with a passion for creating beautiful and functional websites. With a background in Media Design, I combine design and code to create user-friendly digital experiences.'}
                        typingSpeed={10}
                        showCursor={false}
                        loop={false}
                        className="text-[#E0E0E0] text-[18px]"
                        as="span"
                      />
                    ) : (
                      language === 'nl' 
                        ? 'Ik ben een Designer & Front-End Developer uit Gilze met een passie voor het creëren van mooie en functionele websites. Met een achtergrond in Media Design, combineer ik design en code om gebruiksvriendelijke digitale ervaringen te maken.'
                        : 'I am a Designer & Front-End Developer from Gilze with a passion for creating beautiful and functional websites. With a background in Media Design, I combine design and code to create user-friendly digital experiences.'
                    )}
                  </div>
                </div>
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-6 shadow-lg shadow-[#AA61FF]/20">
                  <div className="text-[#E0E0E0] text-[18px] leading-relaxed">
                    {isMounted ? (
                      <TextType 
                        text={language === 'nl' 
                          ? 'Ik ben gespecialiseerd in React, Next.js en moderne webdesign, en ik hou ervan om projecten van concept tot lancering te begeleiden. Elke website die ik maak, combineert visuele esthetiek met technische excellentie.'
                          : 'I specialize in React, Next.js and modern web design, and I love guiding projects from concept to launch. Every website I create combines visual aesthetics with technical excellence.'}
                        typingSpeed={10}
                        showCursor={false}
                        loop={false}
                        className="text-[#E0E0E0] text-[18px]"
                        as="span"
                      />
                    ) : (
                      language === 'nl' 
                        ? 'Ik ben gespecialiseerd in React, Next.js en moderne webdesign, en ik hou ervan om projecten van concept tot lancering te begeleiden. Elke website die ik maak, combineert visuele esthetiek met technische excellentie.'
                        : 'I specialize in React, Next.js and modern web design, and I love guiding projects from concept to launch. Every website I create combines visual aesthetics with technical excellence.'
                    )}
                  </div>
                </div>
              </div>
                  </div>
                </FadeInOnScroll>

                {/* Skillset Section */}
                <FadeInOnScroll delay={100} className="col-span-12">
                  <div className="mb-20">
              <h2 className="text-[#AA61FF] text-[40px] font-semibold mb-8 min-h-[48px]">
                {isMounted ? (
                  <TextType 
                    text="Skillset"
                    typingSpeed={200}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[40px] font-semibold"
                    as="span"
                  />
                ) : (
                  'Skillset'
                )}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Design Card */}
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl overflow-hidden shadow-lg shadow-[#AA61FF]/20">
                  <div className="p-6">
                    <h3 className="text-[#AA61FF] text-xl font-semibold mb-4">{language === 'nl' ? 'Design' : 'Design'}</h3>
                    <div className="text-[#E0E0E0] text-[16px] leading-relaxed space-y-3">
                      <div className="font-semibold text-[#AA61FF] mb-2">{language === 'nl' ? 'Tools & Technologieën:' : 'Tools & Technologies:'}</div>
                      <div className="space-y-2">
                        {['Figma', 'UI/UX Design', 'Prototyping', 'Wireframing'].map((tech) => {
                          const techProjects = getProjectsByTechnology(tech);
                          return (
                            <div key={tech} className="flex items-center justify-between group/item hover:bg-[#AA61FF]/5 rounded-lg px-2 py-1 -mx-2 -my-1 transition-colors">
                              <span>• {tech}</span>
                              {techProjects.length > 0 && (
                                <a
                                  href={getProjectLink(tech)}
                                  className="text-[#AA61FF] text-sm hover:text-[#8844FF] transition-colors flex items-center gap-1 opacity-60 group-hover/item:opacity-100"
                                >
                                  <span className="text-xs">({techProjects.length} {language === 'nl' ? 'project' : 'project'}{techProjects.length > 1 ? (language === 'nl' ? 'en' : 's') : ''})</span>
                                  <span>→</span>
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Development Card */}
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl overflow-hidden shadow-lg shadow-[#AA61FF]/20">
                  <div className="p-6">
                    <h3 className="text-[#AA61FF] text-xl font-semibold mb-4">{language === 'nl' ? 'Development' : 'Development'}</h3>
                    <div className="text-[#E0E0E0] text-[16px] leading-relaxed space-y-3">
                      <div className="font-semibold text-[#AA61FF] mb-2">{language === 'nl' ? 'Tools & Technologieën:' : 'Tools & Technologies:'}</div>
                      <div className="space-y-2">
                        {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'].map((tech) => {
                          const techProjects = getProjectsByTechnology(tech);
                          return (
                            <div key={tech} className="flex items-center justify-between group/item hover:bg-[#AA61FF]/5 rounded-lg px-2 py-1 -mx-2 -my-1 transition-colors">
                              <span>• {tech}</span>
                              {techProjects.length > 0 && (
                                <a
                                  href={getProjectLink(tech)}
                                  className="text-[#AA61FF] text-sm hover:text-[#8844FF] transition-colors flex items-center gap-1 opacity-60 group-hover/item:opacity-100"
                                >
                                  <span className="text-xs">({techProjects.length} {language === 'nl' ? 'project' : 'project'}{techProjects.length > 1 ? (language === 'nl' ? 'en' : 's') : ''})</span>
                                  <span>→</span>
                                </a>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-[#E0E0E0] text-[18px] leading-relaxed max-w-5xl mb-12">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' 
                      ? 'Ik werk dagelijks met deze tools en technologieën om moderne, gebruiksvriendelijke websites en applicaties te bouwen die zowel visueel aantrekkelijk als technisch solide zijn.'
                      : 'I work daily with these tools and technologies to build modern, user-friendly websites and applications that are both visually appealing and technically solid.'}
                    typingSpeed={10}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0] text-[18px]"
                    as="span"
                  />
                ) : (
                  language === 'nl' 
                    ? 'Ik werk dagelijks met deze tools en technologieën om moderne, gebruiksvriendelijke websites en applicaties te bouwen die zowel visueel aantrekkelijk als technisch solide zijn.'
                    : 'I work daily with these tools and technologies to build modern, user-friendly websites and applications that are both visually appealing and technically solid.'
                )}
              </div>

                  </div>
                </FadeInOnScroll>

                {/* Projecten Section */}
                <FadeInOnScroll delay={200} className="col-span-12">
                  <div className="mb-12">
              <h2 className="text-[#AA61FF] text-[40px] font-semibold mb-8 min-h-[48px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' ? 'Projecten' : 'Projects'}
                    typingSpeed={200}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[40px] font-semibold"
                    as="span"
                  />
                ) : (
                  language === 'nl' ? 'Projecten' : 'Projects'
                )}
              </h2>
              <div className="text-[#E0E0E0] text-[18px] leading-relaxed max-w-5xl mb-8 min-h-[120px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' 
                      ? 'Ik werk aan diverse projecten, van kleine websites tot complexe webapplicaties. Elk project benader ik met aandacht voor detail, gebruiksvriendelijkheid en moderne technologie. Of het nu gaat om een portfolio, een e-commerce platform of een interactieve web-app, ik zorg ervoor dat het eindresultaat niet alleen mooi oogt, maar ook perfect functioneert.'
                      : 'I work on various projects, from small websites to complex web applications. I approach each project with attention to detail, user-friendliness and modern technology. Whether it\'s a portfolio, an e-commerce platform or an interactive web app, I ensure that the end result not only looks beautiful, but also functions perfectly.'}
                    typingSpeed={10}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0] text-[18px]"
                    as="span"
                  />
                ) : (
                  language === 'nl' 
                    ? 'Ik werk aan diverse projecten, van kleine websites tot complexe webapplicaties. Elk project benader ik met aandacht voor detail, gebruiksvriendelijkheid en moderne technologie. Of het nu gaat om een portfolio, een e-commerce platform of een interactieve web-app, ik zorg ervoor dat het eindresultaat niet alleen mooi oogt, maar ook perfect functioneert.'
                    : 'I work on various projects, from small websites to complex web applications. I approach each project with attention to detail, user-friendliness and modern technology. Whether it\'s a portfolio, an e-commerce platform or an interactive web app, I ensure that the end result not only looks beautiful, but also functions perfectly.'
                )}
              </div>

              {/* Mijn projecten Link */}
              <a 
                href="/projects"
                className="inline-flex items-center gap-2 backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-xl px-6 py-3 text-[#AA61FF] text-[18px] font-semibold hover:text-[#8844FF] hover:border-[#8844FF] hover:shadow-lg hover:shadow-[#AA61FF]/20 transition-all duration-300 group"
              >
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' ? 'Bekijk alle projecten' : 'View all projects'}
                    typingSpeed={50}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[18px] font-semibold group-hover:text-[#8844FF]"
                    as="span"
                  />
                ) : (
                  language === 'nl' ? 'Bekijk alle projecten' : 'View all projects'
                )}
                <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </a>
                  </div>
                </FadeInOnScroll>
              </div>
            </div>
          </main>
      </div>
    </div>
  );
}
