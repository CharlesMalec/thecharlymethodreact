import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Users, ClipboardList, Compass, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logoNoText from '../images/logo-notext.png';

const Home = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-[#f8fafc] text-gray-800 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-blue-50/70 via-slate-50 to-amber-50/50 py-12 sm:py-20 lg:py-28 flex items-center justify-center text-center overflow-hidden border-b border-gray-100">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-primary rounded-full filter blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-secondary rounded-full filter blur-3xl opacity-40 pointer-events-none" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-amber-200/80 shadow-xs px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-secondary mb-6">
            <span>{t.common.freeBadge}</span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 font-normal">{t.common.noCatch}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight tracking-tight mb-6">
            {t.hero.title}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <NavLink
              to="/contact"
              className="w-full sm:w-auto px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-200 flex items-center justify-center text-base cursor-pointer"
            >
              {t.common.startConversation}
            </NavLink>

            <NavLink
              to="/about"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-primary border-2 border-primary/20 hover:border-primary font-semibold rounded-full shadow-xs hover:bg-gray-50 transition duration-200 flex items-center justify-center text-base cursor-pointer"
            >
              {t.common.exploreApproach}
            </NavLink>
          </div>
        </div>
      </section>

      {/* 2. THREE PILLARS OVERVIEW */}
      <section className="py-12 sm:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {t.home.pillarsBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary mt-3 mb-3">
              {t.home.pillarsTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {t.home.pillarsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: 1-on-1 */}
            <div className="bg-gray-50/70 p-6 sm:p-8 rounded-3xl border border-gray-200/80 hover:border-amber-300 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-secondary mb-5">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{t.home.card1Title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t.home.card1Desc}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-secondary mb-3">{t.home.card1Rate}</div>
                <NavLink
                  to="/services"
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-secondary transition"
                >
                  <span>{t.home.card1Link}</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>

            {/* Card 2: Professional & Management */}
            <div className="bg-gray-50/70 p-6 sm:p-8 rounded-3xl border border-gray-200/80 hover:border-amber-300 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100/80 flex items-center justify-center text-primary mb-5">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{t.home.card2Title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t.home.card2Desc}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-secondary mb-3">{t.home.card2Rate}</div>
                <NavLink
                  to="/services"
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-secondary transition"
                >
                  <span>{t.home.card2Link}</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>

            {/* Card 3: Teams */}
            <div className="bg-gray-50/70 p-6 sm:p-8 rounded-3xl border border-gray-200/80 hover:border-amber-300 hover:shadow-lg transition duration-300 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-secondary mb-5">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{t.home.card3Title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {t.home.card3Desc}
                </p>
              </div>
              <div>
                <div className="text-xs font-semibold text-secondary mb-3">{t.home.card3Rate}</div>
                <NavLink
                  to="/services"
                  className="inline-flex items-center space-x-1.5 text-sm font-bold text-primary hover:text-secondary transition"
                >
                  <span>{t.home.card3Link}</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COACH PREVIEW / HUMAN METHOD SNAPSHOT */}
      <section className="py-12 sm:py-20 bg-gray-50/60 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-md flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0 text-center">
              <div className="relative inline-block">
                <img
                  src="/images/charly.jpg"
                  alt="Charly - Coach & Mentor"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 border-secondary/40 shadow-md bg-white"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = logoNoText;
                  }}
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-2 border-white" title="Disponible pour les sessions 1-on-1" />
              </div>
              <h3 className="text-xl font-extrabold text-primary mt-3">Charly</h3>
              <p className="text-xs text-secondary font-semibold">{t.about.coachRole}</p>
            </div>

            <div className="flex-1 space-y-4">
              <span className="text-secondary font-bold text-xs uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                {t.home.quoteBadge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary leading-snug">
                {t.home.quoteText}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {t.home.coachIntro}
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <NavLink
                  to="/about"
                  className="px-6 py-2.5 bg-primary text-white font-semibold text-sm rounded-full hover:bg-indigo-700 transition"
                >
                  {t.home.btnAbout}
                </NavLink>
                <NavLink
                  to="/journey"
                  className="px-6 py-2.5 bg-gray-100 text-gray-800 hover:text-primary font-semibold text-sm rounded-full hover:bg-gray-200 transition flex items-center space-x-1.5"
                >
                  <Compass className="w-4 h-4 text-secondary" />
                  <span>{t.home.btnJourney}</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY WORK TOGETHER (4 PILLARS) */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl font-extrabold text-primary mb-1">{t.home.stat1Number}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.home.stat1Label}</div>
            </div>
            <div className="p-4 border-l border-gray-100">
              <div className="text-3xl font-extrabold text-primary mb-1">{t.home.stat2Number}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.home.stat2Label}</div>
            </div>
            <div className="p-4 border-l border-gray-100">
              <div className="text-3xl font-extrabold text-secondary mb-1">{t.home.stat3Number}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.home.stat3Label}</div>
            </div>
            <div className="p-4 border-l border-gray-100">
              <div className="text-3xl font-extrabold text-primary mb-1">{t.home.stat4Number}</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t.home.stat4Label}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#0B2C54] to-[#1F4775] text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
            {t.home.ctaTitle}
          </h2>
          <p className="text-gray-200 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            {t.home.ctaSubtitle}
          </p>
          <NavLink
            to="/contact"
            className="inline-flex items-center space-x-2 px-8 py-3.5 bg-secondary text-slate-900 font-bold rounded-full shadow-lg hover:bg-amber-400 transition transform hover:-translate-y-0.5 text-base cursor-pointer"
          >
            <span>{t.home.ctaButton}</span>
            <ArrowRight className="w-5 h-5" />
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default Home;
