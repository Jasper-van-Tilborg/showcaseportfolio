'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Background from '../components/Background';
import TextType from '../components/TextType';
import FadeInOnScroll from '../components/FadeInOnScroll';
import FloatingLabel from '../components/FloatingLabel';

type Language = 'nl' | 'en';

export default function Contact() {
  const [language, setLanguage] = useState<Language>('nl');
  const [hasLoadedOnce, setHasLoadedOnce] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    setHasLoadedOnce(true);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setContentKey(prev => prev + 1);
  }, [language]);

  const translations = {
    nl: {
      title: 'Neem Contact Op',
      formTitle: 'Stuur me direct een bericht',
      formDescription: 'Heb je een vraag voor mij? Vul het onderstaande formulier in en ik reageer zo snel mogelijk:',
      nameLabel: 'Wat is jouw naam?',
      emailLabel: 'Jouw email?',
      messageLabel: 'Jouw bericht?',
      sendButton: 'Verzenden',
      sendingButton: 'Verzenden...',
      successMessage: 'Bedankt! Je bericht is verzonden.',
      errorMessage: 'Er is iets misgegaan. Probeer het opnieuw.',
      copySuccess: 'Gekopieerd naar klembord!',
      resume: 'Download CV',
    },
    en: {
      title: 'Contact Me',
      formTitle: 'Message me directly',
      formDescription: 'Have a question for me? Fill out the following form and I\'ll get back to you as soon as I can:',
      nameLabel: 'What\'s your name?',
      emailLabel: 'Your email?',
      messageLabel: 'Your message?',
      sendButton: 'Send',
      sendingButton: 'Sending...',
      successMessage: 'Thank you! Your message has been sent.',
      errorMessage: 'Something went wrong. Please try again.',
      copySuccess: 'Copied to clipboard!',
      resume: 'Download Resume',
    },
  };

  const t = translations[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission (you can replace this with actual API call)
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1000);
  };

  const handleCopyDiscord = () => {
    navigator.clipboard.writeText('.grobbel');
    alert(t.copySuccess);
  };

  return (
    <div className="min-h-screen text-white relative">
      <Background />
      
      <div className="relative z-10">
        <Header 
          language={language} 
          setLanguage={setLanguage} 
          hasLoadedOnce={hasLoadedOnce}
          currentPage="contact"
        />

        <main className="pt-[150px] pb-[100px]" key={contentKey}>
          <div className="content-container">
            {/* Main Title */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              <div className="col-span-12">
                <FadeInOnScroll>
                  <h1 className="text-[#AA61FF] text-[48px] font-semibold min-h-[58px]">
                    {isMounted ? (
                      <TextType 
                        text={t.title}
                        typingSpeed={200}
                        showCursor={false}
                        loop={false}
                        className="text-[#AA61FF] text-[48px] font-semibold"
                        as="span"
                      />
                    ) : (
                      t.title
                    )}
                  </h1>
                </FadeInOnScroll>
              </div>
            </div>

            {/* Contact Information - Grid Layout */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              {/* First Row */}
              <FadeInOnScroll delay={100} className="col-span-12 md:col-span-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-6">GitHub</h3>
                  <a 
                    href="https://github.com/Jasper-van-Tilborg" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E0E0E0] text-[16px] hover:text-[#AA61FF] transition-colors flex items-start gap-3 group mt-auto break-words"
                  >
                    <span className="flex-1 break-words min-w-0">Jasper-van-Tilborg</span>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                    </svg>
                  </a>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={150} className="col-span-12 md:col-span-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-6">LinkedIn</h3>
                  <a 
                    href="https://www.linkedin.com/in/jasper-van-tilborg" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E0E0E0] text-[16px] hover:text-[#AA61FF] transition-colors flex items-start gap-3 group mt-auto break-words"
                  >
                    <span className="flex-1 break-words min-w-0">jasper-van-tilborg</span>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </div>
              </FadeInOnScroll>

              {/* Second Row */}
              <FadeInOnScroll delay={200} className="col-span-12 md:col-span-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-6">Email</h3>
                  <a 
                    href="mailto:jasper.van.tilborg@ziggo.nl"
                    className="text-[#E0E0E0] text-[16px] hover:text-[#AA61FF] transition-colors flex items-start gap-3 group mt-auto break-words"
                  >
                    <span className="flex-1 break-words min-w-0">jasper.van.tilborg@ziggo.nl</span>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                    </svg>
                  </a>
                </div>
              </FadeInOnScroll>

              <FadeInOnScroll delay={250} className="col-span-12 md:col-span-6">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20 hover:scale-[1.02] transition-all duration-300 h-full flex flex-col overflow-hidden">
                  <h3 className="text-[#AA61FF] text-[20px] font-semibold mb-6">Discord</h3>
                  <button
                    onClick={handleCopyDiscord}
                    className="text-[#E0E0E0] text-[16px] hover:text-[#AA61FF] transition-colors cursor-pointer text-left flex items-start gap-3 group w-full mt-auto break-words"
                  >
                    <span className="flex-1 break-words min-w-0">@.grobbel</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="opacity-70 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                  </button>
                </div>
              </FadeInOnScroll>
            </div>

            {/* Message Form Section */}
            <div className="grid grid-cols-12 gap-8">
              <FadeInOnScroll delay={300} className="col-span-12 lg:col-span-8 lg:col-start-3">
                <div className="backdrop-blur-md bg-gradient-to-br from-[#AA61FF]/20 via-[#AA61FF]/10 to-transparent border border-[#AA61FF]/40 rounded-2xl p-8 shadow-lg shadow-[#AA61FF]/20">
                  <div className="mb-8">
                    <h2 className="text-[#AA61FF] text-[36px] font-semibold mb-4">
                      {t.formTitle}
                    </h2>
                    <p className="text-[#E0E0E0] text-[18px] leading-relaxed">
                      {t.formDescription}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <FloatingLabel
                      label={t.nameLabel}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />

                    {/* Email Field */}
                    <FloatingLabel
                      label={t.emailLabel}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />

                    {/* Message Field */}
                    <FloatingLabel
                      label={t.messageLabel}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={8}
                    />

                    {/* Status Messages */}
                    {formStatus === 'success' && (
                      <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 backdrop-blur-sm">
                        {t.successMessage}
                      </div>
                    )}

                    {formStatus === 'error' && (
                      <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 backdrop-blur-sm">
                        {t.errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full px-8 py-4 bg-[#AA61FF] text-white font-semibold rounded-full hover:bg-[#8844FF] transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#AA61FF]/20 inline-flex items-center justify-center gap-2"
                    >
                      {formStatus === 'sending' ? t.sendingButton : t.sendButton}
                      {formStatus !== 'sending' && <span>→</span>}
                    </button>
                  </form>
                </div>
              </FadeInOnScroll>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
