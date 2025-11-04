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
