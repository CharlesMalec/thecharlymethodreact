import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br from-blue-50/70 via-slate-50 to-amber-50/50 py-10 sm:py-16 lg:py-20 flex items-center justify-center text-center overflow-hidden"
    >
      {/* Ambient Glow Blobs */}
      <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-primary rounded-full filter blur-3xl opacity-50 pointer-events-none animate-pulse duration-10000" />
      <div className="absolute bottom-1/4 right-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-secondary rounded-full filter blur-3xl opacity-50 pointer-events-none animate-pulse duration-10000" />

      {/* Dot Grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative max-w-4xl">
        
        {/* Trust pill */}
        <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-amber-200/80 shadow-xs px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold text-secondary mb-3 sm:mb-5">
          <span>{t.hero.badge}</span>
          <span className="hidden sm:inline text-gray-300">•</span>
          <span className="hidden sm:inline text-gray-600 font-normal">{t.hero.badgeSub}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary leading-tight mb-4 sm:mb-5 tracking-tight">
          {t.hero.title}
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto font-light leading-relaxed">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '#contact');
              }
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-primary text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 transform hover:-translate-y-0.5 cursor-pointer min-h-[44px] flex items-center justify-center text-sm sm:text-base"
          >
            {t.hero.ctaPrimary}
          </a>

          <a
            href="#journey"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('journey');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                window.history.pushState(null, '', '#journey');
              }
            }}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-primary border-2 border-primary/20 hover:border-primary font-semibold rounded-full shadow-2xs hover:bg-gray-50 transition duration-300 transform hover:-translate-y-0.5 cursor-pointer min-h-[44px] flex items-center justify-center text-sm sm:text-base"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
