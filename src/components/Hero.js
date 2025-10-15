import { NavLink } from 'react-router-dom';

const Hero = () => (
  <section
    id="hero"
    className="relative bg-gradient-to-br from-gradient/20 to-primary/80 py-24 md:py-40 flex items-center justify-center text-center"
  >
    <div className="container mx-auto px-4 z-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight mb-4">
        Lead With Clarity. Inspire With Empathy.
      </h1>

      <p className="text-xl md:text-3xl text-black mb-8 max-w-2xl mx-auto font-light">
        The <span className="text-primary font-medium">Charly Method</span> helps managers 
        become <span className="text-secondary font-medium">authentic leaders</span> — 
        who build trust, connection, and real impact.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <NavLink
          to="/contact"
          className="px-8 py-4 bg-primary text-white font-semibold rounded-full shadow-xl hover:bg-indigo-700 transition"
        >
          Start Your Leadership Journey
        </NavLink>

        <NavLink
          to="/about"
          className="px-8 py-4 bg-white text-primary border-2 border-primary font-semibold rounded-full shadow hover:bg-gray-50 transition"
        >
          Discover the Method
        </NavLink>
      </div>
    </div>
  </section>
);

export default Hero;
