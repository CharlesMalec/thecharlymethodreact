import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Coffee, Compass, Target, Award, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CustomerJourney = () => {
  const { t } = useLanguage();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      number: "01",
      id: "discovery",
      title: t.journey.step1.title,
      subtitle: t.journey.step1.subtitle,
      badge: t.journey.step1.badge,
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      icon: Coffee,
      iconBg: "bg-amber-100 text-amber-700",
      description: t.journey.step1.description,
      details: t.journey.step1.details,
      duration: t.journey.step1.duration,
      cost: t.journey.step1.cost,
      format: t.journey.step1.format
    },
    {
      number: "02",
      id: "clarity",
      title: t.journey.step2.title,
      subtitle: t.journey.step2.subtitle,
      badge: t.journey.step2.badge,
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      icon: Compass,
      iconBg: "bg-blue-100 text-blue-700",
      description: t.journey.step2.description,
      details: t.journey.step2.details,
      duration: t.journey.step2.duration,
      cost: t.journey.step2.cost,
      format: t.journey.step2.format
    },
    {
      number: "03",
      id: "coaching",
      title: t.journey.step3.title,
      subtitle: t.journey.step3.subtitle,
      badge: t.journey.step3.badge,
      badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
      icon: Target,
      iconBg: "bg-amber-100 text-amber-700",
      description: t.journey.step3.description,
      details: t.journey.step3.details,
      duration: t.journey.step3.duration,
      cost: t.journey.step3.cost,
      format: t.journey.step3.format
    },
    {
      number: "04",
      id: "autonomy",
      title: t.journey.step4.title,
      subtitle: t.journey.step4.subtitle,
      badge: t.journey.step4.badge,
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      icon: Award,
      iconBg: "bg-purple-100 text-purple-700",
      description: t.journey.step4.description,
      details: t.journey.step4.details,
      duration: t.journey.step4.duration,
      cost: t.journey.step4.cost,
      format: t.journey.step4.format
    }
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white min-h-screen relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-72 h-72 glow-blob-secondary rounded-full filter blur-3xl opacity-25 pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 glow-blob-primary rounded-full filter blur-3xl opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>{t.journey.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            {t.journey.title}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
            {t.journey.subtitle}
          </p>
        </div>

        {/* Desktop / Landscape Step Selector Bar */}
        <div className="mb-8 hidden sm:grid grid-cols-4 gap-3 lg:gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-4 rounded-2xl text-left border transition-all duration-300 min-h-[80px] flex flex-col justify-between cursor-pointer focus:outline-none ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-lg scale-[1.02]'
                    : 'bg-gray-50/80 text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {t.journey.stepNumber} {step.number}
                  </span>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-gray-400'}`} />
                </div>
                <div className="font-bold text-sm lg:text-base leading-tight truncate">
                  {step.title.replace(/^\d+\.\s*/, '')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Scrollable Tab Bar for portrait / phone landscape */}
        <div className="flex sm:hidden overflow-x-auto space-x-2 pb-3 mb-6 scrollbar-none">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold border transition whitespace-nowrap min-h-[44px] flex items-center space-x-2 ${
                  isActive
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-gray-100 text-gray-700 border-gray-200 active:bg-gray-200'
                }`}
              >
                <span className="font-mono opacity-80">{step.number}.</span>
                <span>{step.title.replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Step Card */}
        <div className="bg-gradient-to-br from-gray-50 to-amber-50/20 border border-amber-100 rounded-3xl p-6 sm:p-10 shadow-xl relative transition-all duration-300">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200/80">
            <div className="flex items-start space-x-4">
              <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${currentStep.iconBg}`}>
                <currentStep.icon className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${currentStep.badgeColor}`}>
                    {currentStep.badge}
                  </span>
                  <span className="text-xs font-mono text-gray-400">{t.journey.stepNumber} {currentStep.number} / 04</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                  {currentStep.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 font-medium">
                  {currentStep.subtitle}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white/90 backdrop-blur-sm p-3 sm:p-4 rounded-2xl border border-gray-200/70 text-center text-xs sm:text-sm">
              <div className="px-2">
                <span className="block text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">{t.journey.durationLabel}</span>
                <span className="font-bold text-primary truncate block mt-0.5">{currentStep.duration}</span>
              </div>
              <div className="px-2 border-x border-gray-200">
                <span className="block text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">{t.journey.costLabel}</span>
                <span className="font-bold text-secondary truncate block mt-0.5">{currentStep.cost}</span>
              </div>
              <div className="px-2">
                <span className="block text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider font-semibold">{t.journey.formatLabel}</span>
                <span className="font-bold text-gray-700 truncate block mt-0.5">{currentStep.format}</span>
              </div>
            </div>
          </div>

          {/* Description & Key Details */}
          <div className="py-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t.journey.whatHappens}</h3>
              <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                {currentStep.description}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">{t.journey.deliverables}</h3>
              <ul className="space-y-2.5">
                {currentStep.details.map((detail, index) => (
                  <li key={index} className="flex items-start space-x-3 text-sm sm:text-base text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Navigation & CTA */}
          <div className="pt-6 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition min-h-[44px] cursor-pointer"
              >
                {t.journey.prevStep}
              </button>
              <div className="flex space-x-1">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === activeStepIndex ? 'w-6 bg-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                disabled={activeStepIndex === steps.length - 1}
                onClick={() => setActiveStepIndex((prev) => Math.min(steps.length - 1, prev + 1))}
                className="px-4 py-2 text-xs sm:text-sm font-semibold text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed hover:text-primary transition min-h-[44px] cursor-pointer"
              >
                {t.journey.nextStep}
              </button>
            </div>

            <NavLink
              to="/contact"
              className="w-full sm:w-auto px-6 py-3.5 bg-primary text-white text-sm sm:text-base font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition flex items-center justify-center space-x-2 min-h-[48px] cursor-pointer"
            >
              <span>{t.journey.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CustomerJourney;
