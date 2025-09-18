import { NavLink } from 'react-router-dom';

const Hero = () => (
  <section id="hero" className="relative bg-gradient-to-br from-indigo-50 to-blue-100 py-24 md:py-40 flex items-center justify-center text-center">
    <div className="container mx-auto px-4 z-10">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
        The Charly Method
      </h1>
      <p className="text-xl md:text-3xl text-gray-600 mb-8 max-w-2xl mx-auto font-light">
        From Manager to <span className="text-indigo-600 font-medium">Authentic Leader.</span>
      </p>
      <NavLink
        to="/contact"
        className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-full shadow-xl hover:bg-indigo-700"
      >
        Start Your Leadership Journey
      </NavLink>
    </div>
    <div className="absolute top-4 right-4">
      <NavLink to="/payment" className="text-white text-sm bg-indigo-600 px-4 py-2 rounded-full hover:bg-indigo-700">
        Login / Subscribe
      </NavLink>
    </div>
  </section>
);

export default Hero;