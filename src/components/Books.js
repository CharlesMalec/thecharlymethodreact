import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';

const Books = () => {
  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-gray-50/60 min-h-screen relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span>Curated Reading List</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">
            Recommended Books
          </h1>
          <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed font-light">
            Essential books that inspire human-centric leadership, thoughtful team dynamics, and authentic decision-making.
          </p>
          <p className="text-xs text-gray-400 mt-2 font-mono">
            (As an Amazon Associate, we earn from qualifying purchases.)
          </p>
        </div>
        
        <div className="grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Book 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50/80 p-4 rounded-2xl mb-5 flex items-center justify-center border border-gray-100">
                <img 
                  src="https://m.media-amazon.com/images/I/71ece6mAwoL._SL1000_.jpg" 
                  alt="The Human-Centric Workplace" 
                  className="h-48 sm:h-56 object-contain rounded-md shadow-xs" 
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-1">The Human-Centric Workplace</h2>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Simone Fenton-Jarvis</p>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                <p><strong>Description:</strong> Explores how recognition, connection, and empowerment drive human-centric workplaces, with strategies to foster sustainable performance and well-being.</p>
                <p><strong>Why I Recommend:</strong> Focuses on practical approaches to humanize workplaces, perfectly aligned with our approach.</p>
              </div>
            </div>
            <a 
              href="https://amzn.to/3JJQpgr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center space-x-2"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Book 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50/80 p-4 rounded-2xl mb-5 flex items-center justify-center border border-gray-100">
                <img 
                  src="https://m.media-amazon.com/images/I/71WUqP6mNHL._SL1500_.jpg" 
                  alt="Making Work Human" 
                  className="h-48 sm:h-56 object-contain rounded-md shadow-xs" 
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-1">Making Work Human</h2>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Eric Mosley & Derek Irvine</p>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                <p><strong>Description:</strong> A practical guide for creating workplaces that prioritize employee well-being, creativity, and performance over pure productivity metrics.</p>
                <p><strong>Why I Recommend:</strong> Directly aligns with human-centric principles, offering actionable insights for leaders.</p>
              </div>
            </div>
            <a 
              href="https://amzn.to/3VtmQ58" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center space-x-2"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Book 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200/80 hover:shadow-xl hover:border-amber-200 transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50/80 p-4 rounded-2xl mb-5 flex items-center justify-center border border-gray-100">
                <img 
                  src="https://m.media-amazon.com/images/I/71zXntN+mQL._SL1500_.jpg" 
                  alt="The Heart of Service" 
                  className="h-48 sm:h-56 object-contain rounded-md shadow-xs" 
                />
              </div>
              <h2 className="text-xl font-bold text-primary mb-1">The Heart of Service</h2>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Nick Glimsdahl</p>
              <div className="space-y-2 text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                <p><strong>Description:</strong> A business parable for integrating technology in service while prioritizing human connection, with real-world leadership takeaways.</p>
                <p><strong>Why I Recommend:</strong> Balances technology and human-centricity, highly relevant for modern organizational life.</p>
              </div>
            </div>
            <a 
              href="https://amzn.to/4n7CAXj" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center space-x-2"
            >
              <span>Buy on Amazon</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Custom recommendation banner */}
        <div className="mt-12 sm:mt-16 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-secondary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-1">Looking for custom reading tailored to your situation?</h3>
              <p className="text-gray-600 text-sm">Ask during your free 60-minute chat and I’ll provide tailored book suggestions.</p>
            </div>
          </div>
          <NavLink
            to="/contact"
            className="px-6 py-3 bg-primary text-white font-semibold text-sm rounded-full hover:bg-indigo-700 transition flex items-center space-x-2 flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ask for Recommendations</span>
          </NavLink>
        </div>

      </div>
    </div>
  );
};

export default Books;