'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import TextType from '../components/TextType';
import FadeInOnScroll from '../components/FadeInOnScroll';

type Language = 'nl' | 'en';

export default function About() {
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
                <div className="col-span-12 grid grid-cols-12 gap-8 mb-20">
                  {/* Profile Image - Left Side */}
                  <div className="col-span-4">
                <div className="bg-[#1a1a2e] rounded-3xl aspect-3/4 overflow-hidden border border-white/10">
                  <img 
                    src="/images/image portfolio.jpg" 
                    alt="Jasper van Tilborg"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

                  {/* Intro Text - Right Side */}
                  <div className="col-span-8 flex flex-col justify-center">
                {isMounted ? (
                  <>
                    <div className="text-[#E0E0E0] text-[18px] leading-relaxed mb-8">
                      <TextType 
                        text={language === 'nl' ? 'Hey,' : 'Hey,'}
                        typingSpeed={75}
                        showCursor={false}
                        loop={false}
                        className="text-[#E0E0E0] text-[18px]"
                        as="span"
                      />
                    </div>
                    <div className="text-[#E0E0E0] text-[18px] leading-relaxed mb-2">
                      {language === 'nl' ? (
                        <TextType 
                          text="Mijn naam is Jasper van Tilborg"
                          typingSpeed={50}
                          showCursor={false}
                          loop={false}
                          className="text-[#E0E0E0] text-[18px]"
                          as="span"
                        />
                      ) : (
                        <TextType 
                          text="My name is Jasper van Tilborg"
                          typingSpeed={50}
                          showCursor={false}
                          loop={false}
                          className="text-[#E0E0E0] text-[18px]"
                          as="span"
                        />
                      )}
                    </div>
                    <div className="text-[#E0E0E0] text-[18px] leading-relaxed mb-2">
                      {language === 'nl' ? (
                        <TextType 
                          text="Ik ben een Designer & Front-End Developer uit"
                          typingSpeed={50}
                          showCursor={false}
                          loop={false}
                          className="text-[#E0E0E0] text-[18px]"
                          as="span"
                        />
                      ) : (
                        <TextType 
                          text="I am a Designer & Front-End Developer from"
                          typingSpeed={50}
                          showCursor={false}
                          loop={false}
                          className="text-[#E0E0E0] text-[18px]"
                          as="span"
                        />
                      )}
                    </div>
                    <div className="text-[#AA61FF] text-[18px] leading-relaxed font-semibold mb-12">
                      <TextType 
                        text={language === 'nl' ? 'Gilze, Nederland' : 'Gilze, Netherlands'}
                        typingSpeed={50}
                        showCursor={false}
                        loop={false}
                        className="text-[#AA61FF] text-[18px] font-semibold"
                        as="span"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-[#E0E0E0] text-[18px] leading-relaxed mb-8">
                      {language === 'nl' ? 'Hey,' : 'Hey,'}
                    </p>
                    <p className="text-[#E0E0E0] text-[18px] leading-relaxed mb-2">
                      Mijn naam is Jasper van Tilborg
                    </p>
                    <p className="text-[#E0E0E0] text-[18px] leading-relaxed mb-2">
                      Ik ben een Designer & Front-End Developer uit
                    </p>
                    <p className="text-[#AA61FF] text-[18px] leading-relaxed font-semibold mb-12">
                      Gilze, Nederland
                    </p>
                  </>
                )}

                    {/* Contact Section */}
                    <div>
                    <h3 className="text-white text-[20px] font-semibold mb-6">
                      {isMounted ? (
                        <TextType 
                          text="Contact:"
                          typingSpeed={50}
                          showCursor={false}
                          loop={false}
                          className="text-white text-[20px] font-semibold"
                          as="span"
                        />
                      ) : (
                        'Contact:'
                      )}
                    </h3>
                    
                    {/* Contact Links Grid - 2x2 */}
                    <div className="grid grid-cols-2 gap-x-12 gap-y-4 max-w-2xl">
                      {/* GitHub */}
                      <div className="flex items-center gap-3">
                        <span className="text-[#E0E0E0] text-[18px]">
                          {isMounted ? (
                            <TextType 
                              text="Jasper-van-Tilborg"
                              typingSpeed={50}
                              showCursor={false}
                              loop={false}
                              className="text-[#E0E0E0] text-[18px]"
                              as="span"
                            />
                          ) : (
                            'Jasper-van-Tilborg'
                          )}
                        </span>
                        <a 
                          href="https://github.com/Jasper-van-Tilborg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#AA61FF] hover:text-[#8844FF] transition-colors duration-300 shine-effect"
                        >
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      </div>

                      {/* LinkedIn */}
                      <div className="flex items-center gap-3">
                        <span className="text-[#E0E0E0] text-[18px]">
                          {isMounted ? (
                            <TextType 
                              text="Jasper van Tilborg"
                              typingSpeed={50}
                              showCursor={false}
                              loop={false}
                              className="text-[#E0E0E0] text-[18px]"
                              as="span"
                            />
                          ) : (
                            'Jasper van Tilborg'
                          )}
                        </span>
                        <a 
                          href="https://www.linkedin.com/in/jasper-van-tilborg" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#AA61FF] hover:text-[#8844FF] transition-colors duration-300 shine-effect"
                        >
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                          </svg>
                        </a>
                      </div>

                      {/* Discord */}
                      <div className="flex items-center gap-3">
                        <span className="text-[#E0E0E0] text-[18px]">
                          {isMounted ? (
                            <TextType 
                              text=".grobbel"
                              typingSpeed={50}
                              showCursor={false}
                              loop={false}
                              className="text-[#E0E0E0] text-[18px]"
                              as="span"
                            />
                          ) : (
                            '.grobbel'
                          )}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('.grobbel');
                            // Optional: show a toast/notification that it was copied
                            alert('Discord username gekopieerd naar klembord!');
                          }}
                          className="text-[#AA61FF] hover:text-[#8844FF] transition-colors duration-300 shine-effect cursor-pointer"
                          title="Klik om Discord username te kopiëren"
                        >
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </button>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <span className="text-[#E0E0E0] text-[18px]">
                          {isMounted ? (
                            <TextType 
                              text="jasper.van.tilborg@ziggo.nl"
                              typingSpeed={50}
                              showCursor={false}
                              loop={false}
                              className="text-[#E0E0E0] text-[18px]"
                              as="span"
                            />
                          ) : (
                            'jasper.van.tilborg@ziggo.nl'
                          )}
                        </span>
                        <a 
                          href="mailto:jasper.van.tilborg@ziggo.nl"
                          className="text-[#AA61FF] hover:text-[#8844FF] transition-colors duration-300 shine-effect"
                        >
                          <svg 
                            width="24" 
                            height="24" 
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                            className="w-6 h-6"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>

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
              <div className="text-[#E0E0E0] text-[18px] leading-relaxed max-w-5xl min-h-[120px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' 
                      ? 'Ik ben een Designer & Front-End Developer uit Gilze met een passie voor het creëren van mooie en functionele websites. Met een achtergrond in Media Design, combineer ik design en code om gebruiksvriendelijke digitale ervaringen te maken. Ik ben gespecialiseerd in React, Next.js en moderne webdesign, en ik hou ervan om projecten van concept tot lancering te begeleiden.'
                      : 'I am a Designer & Front-End Developer from Gilze with a passion for creating beautiful and functional websites. With a background in Media Design, I combine design and code to create user-friendly digital experiences. I specialize in React, Next.js and modern web design, and I love guiding projects from concept to launch.'}
                    typingSpeed={10}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0] text-[18px]"
                    as="span"
                  />
                ) : (
                  language === 'nl' 
                    ? 'Ik ben een Designer & Front-End Developer uit Gilze met een passie voor het creëren van mooie en functionele websites. Met een achtergrond in Media Design, combineer ik design en code om gebruiksvriendelijke digitale ervaringen te maken. Ik ben gespecialiseerd in React, Next.js en moderne webdesign, en ik hou ervan om projecten van concept tot lancering te begeleiden.'
                    : 'I am a Designer & Front-End Developer from Gilze with a passion for creating beautiful and functional websites. With a background in Media Design, I combine design and code to create user-friendly digital experiences. I specialize in React, Next.js and modern web design, and I love guiding projects from concept to launch.'
                )}
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
              <div className="text-[#E0E0E0] text-[18px] leading-relaxed max-w-5xl min-h-[120px]">
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' 
                      ? 'Mijn skillset omvat een breed scala aan design- en development tools. Ik werk dagelijks met Figma voor UI/UX design, en vertaal deze ontwerpen naar code met React, Next.js, TypeScript en Tailwind CSS. Daarnaast heb ik ervaring met animaties (GSAP, Framer Motion), responsive design, en het optimaliseren van websites voor performance en toegankelijkheid.'
                      : 'My skillset includes a wide range of design and development tools. I work daily with Figma for UI/UX design, and translate these designs into code using React, Next.js, TypeScript and Tailwind CSS. Additionally, I have experience with animations (GSAP, Framer Motion), responsive design, and optimizing websites for performance and accessibility.'}
                    typingSpeed={10}
                    showCursor={false}
                    loop={false}
                    className="text-[#E0E0E0] text-[18px]"
                    as="span"
                  />
                ) : (
                  language === 'nl' 
                    ? 'Mijn skillset omvat een breed scala aan design- en development tools. Ik werk dagelijks met Figma voor UI/UX design, en vertaal deze ontwerpen naar code met React, Next.js, TypeScript en Tailwind CSS. Daarnaast heb ik ervaring met animaties (GSAP, Framer Motion), responsive design, en het optimaliseren van websites voor performance en toegankelijkheid.'
                    : 'My skillset includes a wide range of design and development tools. I work daily with Figma for UI/UX design, and translate these designs into code using React, Next.js, TypeScript and Tailwind CSS. Additionally, I have experience with animations (GSAP, Framer Motion), responsive design, and optimizing websites for performance and accessibility.'
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
                className="text-[#AA61FF] text-[18px] font-semibold border-b-2 border-[#AA61FF] pb-1 hover:text-[#8844FF] hover:border-[#8844FF] transition-all duration-300 inline-block"
              >
                {isMounted ? (
                  <TextType 
                    text={language === 'nl' ? 'Mijn projecten' : 'My projects'}
                    typingSpeed={50}
                    showCursor={false}
                    loop={false}
                    className="text-[#AA61FF] text-[18px] font-semibold"
                    as="span"
                  />
                ) : (
                  language === 'nl' ? 'Mijn projecten' : 'My projects'
                )}
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
