import React from 'react';

const Books = () => {
  const scrollToContact = (e) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', '#contact');
    }
  };

  return (
    <section id="books" className="py-12 landscape:py-10 sm:py-20 lg:py-28 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-3 text-primary tracking-tight">
          Recommended Books
        </h2>
        <p className="text-base sm:text-lg text-gray-600 text-center max-w-2xl mx-auto mb-10 sm:mb-16 font-light">
          Discover books that inspire human-centric leadership and authentic choices.
          <span className="block text-xs text-gray-400 mt-1">(As an Amazon Associate, we earn from qualifying purchases.)</span>
        </p>
        
        <div className="grid grid-cols-1 landscape:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50 p-4 rounded-2xl mb-5 flex items-center justify-center">
                <img src="https://m.media-amazon.com/images/I/71ece6mAwoL._SL1000_.jpg" alt="The Human-Centric Workplace" className="h-52 sm:h-60 object-contain rounded-md shadow-xs" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">The Human-Centric Workplace</h3>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Simone Fenton-Jarvis</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3"><strong>Description:</strong> Explores how recognition, connection, and empowerment drive human-centric workplaces, with strategies to foster sustainable performance and well-being.</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4"><strong>Why Recommend:</strong> Focuses on practical approaches to humanize workplaces, perfectly aligned with our approach.</p>
            </div>
            <a href="https://amzn.to/3JJQpgr" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center">
              Buy on Amazon
            </a>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50 p-4 rounded-2xl mb-5 flex items-center justify-center">
                <img src="https://m.media-amazon.com/images/I/71WUqP6mNHL._SL1500_.jpg" alt="Making Work Human" className="h-52 sm:h-60 object-contain rounded-md shadow-xs" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Making Work Human</h3>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Eric Mosley & Derek Irvine</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3"><strong>Description:</strong> A practical guide for creating workplaces that prioritize employee well-being, creativity, and performance over pure productivity metrics.</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4"><strong>Why Recommend:</strong> Directly aligns with human-centric principles, offering actionable insights for leaders.</p>
            </div>
            <a href="https://amzn.to/3VtmQ58" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center">
              Buy on Amazon
            </a>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition duration-300 flex flex-col justify-between">
            <div>
              <div className="bg-gray-50 p-4 rounded-2xl mb-5 flex items-center justify-center">
                <img src="https://m.media-amazon.com/images/I/71zXntN+mQL._SL1500_.jpg" alt="The Heart of Service" className="h-52 sm:h-60 object-contain rounded-md shadow-xs" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">The Heart of Service</h3>
              <p className="text-xs sm:text-sm font-semibold text-secondary mb-3">by Nick Glimsdahl</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3"><strong>Description:</strong> A business parable for integrating technology in service while prioritizing human connection, with real-world leadership takeaways.</p>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4"><strong>Why Recommend:</strong> Balances technology and human-centricity, highly relevant for modern organizational life.</p>
            </div>
            <a href="https://amzn.to/4n7CAXj" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-6 bg-primary text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-indigo-700 transition text-center min-h-[44px] flex items-center justify-center">
              Buy on Amazon
            </a>
          </div>
        </div>

        <div className="text-center mt-10 sm:mt-14">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition text-sm sm:text-base min-h-[48px] cursor-pointer"
          >
            Ask for More Custom Book Recommendations
          </a>
        </div>
      </div>
    </section>
  );
};

export default Books;