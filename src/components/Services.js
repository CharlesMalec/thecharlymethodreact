import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Users, ClipboardList, Sparkles, ArrowRight } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

const Services = () => {
    const { t } = useLanguage();

    return (
        <div className="py-12 sm:py-16 lg:py-20 bg-gray-50/50 min-h-screen relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 glow-blob-primary rounded-full filter blur-3xl opacity-30 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
                    <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
                        <Sparkles className="w-4 h-4 text-secondary" />
                        <span>{t.services.badge}</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
                        {t.services.title}
                    </h1>
                    <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
                        {t.services.subtitle}
                    </p>
                </div>
                
                <div className="grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* One-on-One Life & Career Coaching */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-amber-50 rounded-2xl border border-amber-200">
                                <User className="h-7 w-7 text-secondary" />
                            </div>
                            <h2 className="text-xl sm:text-2xl text-primary font-bold mb-3">{t.services.service1Title}</h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                {t.services.service1Desc}
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">{t.services.service1Coffee}</p>
                            <p className="text-gray-500">{t.services.service1FreeNote}</p>
                            <p className="mt-1 font-bold text-secondary">{t.services.service1Rate}</p>

                            <NavLink
                                to="/contact"
                                className="mt-4 w-full py-2.5 px-4 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-1.5 min-h-[44px] cursor-pointer"
                            >
                                <span>{t.services.bookBtn}</span>
                                <ArrowRight className="w-4 h-4" />
                            </NavLink>
                        </div>
                    </div>

                    {/* Professional & Leadership Guidance */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-amber-50 rounded-2xl border border-amber-200">
                                <ClipboardList className="h-7 w-7 text-secondary" />
                            </div>
                            <h2 className="text-xl sm:text-2xl text-primary font-bold mb-3">{t.services.service2Title}</h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                {t.services.service2Desc}
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">{t.services.service2Coffee}</p>
                            <p className="text-gray-500">{t.services.service2FreeNote}</p>
                            <p className="mt-1 font-bold text-secondary">{t.services.service2Rate}</p>

                            <NavLink
                                to="/contact"
                                className="mt-4 w-full py-2.5 px-4 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-1.5 min-h-[44px] cursor-pointer"
                            >
                                <span>{t.services.bookBtn}</span>
                                <ArrowRight className="w-4 h-4" />
                            </NavLink>
                        </div>
                    </div>

                    {/* Team Support */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-blue-50 rounded-2xl border border-blue-100">
                                <Users className="h-7 w-7 text-primary" />
                            </div>
                            <h2 className="text-xl sm:text-2xl text-primary font-bold mb-3">{t.services.service3Title}</h2>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                {t.services.service3Desc}
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">{t.services.service3Header}</p>
                            <p className="text-gray-500">{t.services.service3SubNote}</p>
                            <p className="mt-1 font-bold text-secondary">{t.services.service3Rate}</p>

                            <NavLink
                                to="/contact"
                                className="mt-4 w-full py-2.5 px-4 bg-white text-primary border border-primary/30 hover:border-primary text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-50 transition flex items-center justify-center space-x-1.5 min-h-[44px] cursor-pointer"
                            >
                                <span>{t.services.bookTeamBtn}</span>
                                <ArrowRight className="w-4 h-4" />
                            </NavLink>
                        </div>
                    </div>
                </div>

                {/* Bottom Reassurance Banner */}
                <div className="mt-12 sm:mt-16 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">{t.services.bannerTitle}</h3>
                        <p className="text-gray-600 text-sm">{t.services.bannerDesc}</p>
                    </div>
                    <NavLink
                        to="/contact"
                        className="px-6 py-3 bg-primary text-white font-semibold text-sm rounded-full hover:bg-indigo-700 transition flex-shrink-0 cursor-pointer"
                    >
                        {t.services.bannerBtn}
                    </NavLink>
                </div>

            </div>
        </div>
    );
};

export default Services;