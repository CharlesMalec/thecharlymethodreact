import React from 'react';
import { User, Users, ClipboardList } from "lucide-react";

const Services = () => {
    const scrollToContact = (e) => {
        e.preventDefault();
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', '#contact');
        }
    };

    return (
        <section id="services" className="py-12 landscape:py-10 sm:py-20 lg:py-28 bg-gray-50/50 scroll-mt-20 relative overflow-hidden">
            {/* Ambient background decoration */}
            <div className="absolute inset-0 dot-grid opacity-[0.03] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 glow-blob-primary rounded-full filter blur-2xl opacity-40 pointer-events-none" />

            <div className="container mx-auto px-4 max-w-6xl relative z-10">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 text-primary tracking-tight">
                    How I Can Support You
                </h2>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10 sm:mb-16 text-base sm:text-lg font-light">
                    No corporate jargon or rigid textbooks. Just honest, practical guidance tailored to your specific situation.
                </p>
                
                <div className="grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* One-on-One Life & Career Coaching */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-amber-50 rounded-2xl border border-amber-200">
                                <User className="h-7 w-7 text-secondary" />
                            </div>
                            <h3 className="text-xl sm:text-2xl text-primary font-bold mb-3">Life & Career Conversations</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                If you are facing a difficult personal decision, feeling stuck, or trying to figure out your next step, let’s talk. I offer a calm, confidential space to sort through your thoughts, weigh your choices, and find a path forward that feels genuinely right for you.
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">☕ Let's grab a virtual coffee</p>
                            <p className="text-gray-500">First 60 minutes are free. No catch, no pressure.</p>
                            <p className="mt-1 font-bold text-secondary">Follow-ups: 100€ / hour</p>

                            <a
                                href="#contact"
                                onClick={scrollToContact}
                                className="mt-4 w-full py-2.5 px-4 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-1 min-h-[44px] cursor-pointer"
                            >
                                <span>Book Free Session</span>
                            </a>
                        </div>
                    </div>

                    {/* Team Support */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-blue-50 rounded-2xl border border-blue-100">
                                <Users className="h-7 w-7 text-primary" />
                            </div>
                            <h3 className="text-xl sm:text-2xl text-primary font-bold mb-3">Support for Teams</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                Having worked as a senior manager, I know how hard it can be to keep a team working well together without losing the human touch. I help small teams improve how they talk to one another, build genuine trust, and work through day-to-day friction in a straightforward, practical way.
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">👥 Practical alignment support</p>
                            <p className="text-gray-500">Tailored to your team size and everyday operational needs.</p>
                            <p className="mt-1 font-bold text-secondary">Pricing: On demand</p>

                            <a
                                href="#contact"
                                onClick={scrollToContact}
                                className="mt-4 w-full py-2.5 px-4 bg-white text-primary border border-primary/30 hover:border-primary text-xs sm:text-sm font-semibold rounded-full hover:bg-gray-50 transition flex items-center justify-center space-x-1 min-h-[44px] cursor-pointer"
                            >
                                <span>Inquire for Team</span>
                            </a>
                        </div>
                    </div>

                    {/* Professional & Leadership Guidance */}
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-center h-14 w-14 mb-5 bg-amber-50 rounded-2xl border border-amber-200">
                                <ClipboardList className="h-7 w-7 text-secondary" />
                            </div>
                            <h3 className="text-xl sm:text-2xl text-primary font-bold mb-3">Professional & Management Support</h3>
                            <p className="text-gray-600 leading-relaxed text-sm sm:text-base mb-6">
                                Managing a team—especially if you're new to the role—can feel overwhelming. I don't offer generic corporate lectures. Instead, we'll talk through your actual day-to-day work challenges, using my real-world experience to help you lead with confidence, handle stress, and stay true to your values.
                            </p>
                        </div>
                        <div className="pt-5 border-t border-gray-100 text-xs sm:text-sm text-gray-700">
                            <p className="font-semibold text-primary mb-1">☕ Let's grab a virtual coffee</p>
                            <p className="text-gray-500">First 60 minutes are free. No catch, no pressure.</p>
                            <p className="mt-1 font-bold text-secondary">Follow-ups: 100€ / hour</p>

                            <a
                                href="#contact"
                                onClick={scrollToContact}
                                className="mt-4 w-full py-2.5 px-4 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-1 min-h-[44px] cursor-pointer"
                            >
                                <span>Book Free Session</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Services;