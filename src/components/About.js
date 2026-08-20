import React from "react";
import { NavLink } from "react-router-dom";
import { FaQuoteLeft } from "react-icons/fa";
import { ArrowRight, Sparkles } from "lucide-react";
import logo from "../images/logo.png";
import logoNoText from "../images/logo-notext.png";
import AboutText from "./AboutText";
import Human from "./Human";

const About = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white min-h-screen relative overflow-hidden">
      {/* Decorative blur elements for visual warmth */}
      <div className="absolute -top-10 -right-10 w-80 h-80 glow-blob-secondary rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Real-World Leadership & Empathy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            About Me & My Approach
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 font-light leading-relaxed">
            Coaching is a partnership between two people. Here is who I am, what I stand for, and how we will work together.
          </p>
        </div>

        {/* Bio & Coach Card */}
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 mb-14 sm:mb-18">
          <AboutText />
          
          <div className="lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-amber-50/60 via-white to-blue-50/30 rounded-3xl border border-amber-100 shadow-lg relative overflow-hidden">
            <FaQuoteLeft className="text-secondary/15 text-5xl sm:text-6xl absolute top-6 right-6 pointer-events-none" />
            
            <div className="space-y-6 relative z-10">
              {/* Coach Profile Header */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <img
                    src="/images/charly.jpg"
                    alt="Charly - Coach & Career Mentor"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-secondary/40 shadow-md bg-white"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = logoNoText;
                    }}
                  />
                  <span className="absolute -bottom-1 -right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white" title="Available for 1-on-1 sessions" />
                </div>

                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-primary">Charly</h3>
                  <p className="text-xs sm:text-sm font-semibold text-secondary mb-1.5">Coach & Career Mentor</p>
                  <span className="inline-block bg-amber-100/90 text-amber-900 border border-amber-300/80 text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-2xs">
                    10+ Yrs Management & Leadership
                  </span>
                </div>
              </div>

              {/* Personal Quote */}
              <p className="text-gray-700 italic leading-relaxed text-base sm:text-lg">
                "I believe coaching is simply a real, high-quality conversation between two human beings. 
                There are no generic consulting templates here. I am here to truly listen, share my genuine 
                professional experience, and support you in finding your own path."
              </p>

              <div className="p-4 bg-white/90 rounded-2xl border border-blue-100 shadow-2xs text-xs sm:text-sm text-gray-600">
                <p className="font-semibold text-primary mb-1">💬 Human-Centric Guarantee</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Coaching is never about rigid formulas—it is about <strong>your challenges, your career, and your growth</strong>. 
                  Let's explore what's possible together.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono">The Charly Method</span>
              <img
                src={logo}
                alt="The Charly Method Logo"
                className="h-8 sm:h-10 w-auto opacity-80"
              />
            </div>
          </div>
        </div>

        {/* HUMAN framework section */}
        <Human />

        {/* CTA below HUMAN section */}
        <div className="text-center mt-12 sm:mt-16 pt-8 border-t border-gray-100">
          <NavLink
            to="/contact"
            className="inline-flex items-center justify-center space-x-2 bg-primary text-white px-8 py-3.5 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform hover:-translate-y-0.5 min-h-[48px] cursor-pointer"
          >
            <span>Let’s Talk About What’s on Your Mind</span>
            <ArrowRight className="w-5 h-5" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default About;
