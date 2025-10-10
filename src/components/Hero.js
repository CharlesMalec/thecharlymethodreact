import { NavLink } from 'react-router-dom';

const Hero = () => (
  <section id="hero" className="relative bg-gradient-to-br from-gradient/20 to-primary/80 py-24 md:py-40 flex items-center justify-center text-center">
    <div className="container mx-auto px-4 z-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight mb-4">
        The Charly Method
      </h1>
      <p className="text-xl md:text-3xl text-black mb-8 max-w-2xl mx-auto font-light">
        From <span className="text-primary font-medium">Manager</span> to <span className="text-secondary font-medium">Authentic Leader.</span>
      </p>
      <NavLink
        to="/contact"
        className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-xl hover:bg-indigo-700"
      >
        Start Your Leadership Journey
      </NavLink>
    </div>
  </section>
);

export default Hero;