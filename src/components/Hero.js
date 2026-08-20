const Hero = () => (
  <section
    id="hero"
    className="relative bg-gradient-to-br from-blue-50/70 via-slate-50 to-amber-50/50 py-10 landscape:py-6 sm:py-24 lg:py-36 flex items-center justify-center text-center overflow-hidden"
  >
    {/* Ambient Glow Blobs */}
    <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-primary rounded-full filter blur-3xl opacity-50 pointer-events-none animate-pulse duration-10000" />
    <div className="absolute bottom-1/4 right-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-secondary rounded-full filter blur-3xl opacity-50 pointer-events-none animate-pulse duration-10000" />

    {/* Dot Grid overlay */}
    <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />

    <div className="container mx-auto px-4 z-10 relative max-w-5xl">
      
      {/* Trust pill */}
      <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm border border-amber-200/80 shadow-xs px-3.5 py-1 landscape:py-0.5 rounded-full text-xs sm:text-sm font-semibold text-secondary mb-3 sm:mb-6 landscape:mb-2">
        <span>☕ First 60-Minute Conversation Free</span>
        <span className="hidden sm:inline text-gray-300">•</span>
        <span className="hidden sm:inline text-gray-600 font-normal">No Catch, No Pressure</span>
      </div>

      <h1 className="text-3xl landscape:text-xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight sm:leading-tight mb-3 sm:mb-6 landscape:mb-2 tracking-tight">
        Let's Find Clarity in Your Big Decisions.
      </h1>

      <p className="text-base sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8 landscape:mb-4 max-w-3xl landscape:max-w-xl mx-auto font-light leading-relaxed landscape:text-xs">
        Facing a difficult choice in your life, or trying to find your footing in your career? 
        I offer straightforward, empathetic coaching grounded in real-world experience, to help you move forward with confidence.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 landscape:gap-2.5 w-full max-w-md sm:max-w-none mx-auto">
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
          className="w-full sm:w-auto px-8 py-3.5 sm:py-4 landscape:py-2 landscape:px-5 bg-primary text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition duration-300 transform hover:-translate-y-0.5 cursor-pointer min-h-[44px] sm:min-h-[48px] landscape:min-h-[36px] flex items-center justify-center text-sm sm:text-base landscape:text-xs"
        >
          Let's Start a Conversation
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
          className="w-full sm:w-auto px-8 py-3.5 sm:py-4 landscape:py-2 landscape:px-5 bg-white text-primary border-2 border-primary/20 hover:border-primary font-semibold rounded-full shadow-xs hover:bg-gray-50 transition duration-300 transform hover:-translate-y-0.5 cursor-pointer min-h-[44px] sm:min-h-[48px] landscape:min-h-[36px] flex items-center justify-center text-sm sm:text-base landscape:text-xs"
        >
          Discover Your Journey
        </a>
      </div>
    </div>
  </section>
);

export default Hero;
