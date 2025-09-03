import React from 'react';
import logo from '../images/logo.png';

const About = () => (
  <section id="about" className="py-20 md:py-32 bg-white">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-900">About Our Method</h2>
      <div className="flex flex-col md:flex-row items-center md:space-x-12">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            In today's fast-paced world, being a good manager is no longer enough. 
            The most successful organizations are built on a foundation of genuine, human-centric leadership. 
            The transition from managing tasks to truly leading people can feel overwhelming, but it is the most critical step in a professional’s journey.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Through a personalized and ethical approach, we equip leaders with the tools to inspire their teams, foster a culture of trust, and navigate challenges with confidence. 
            Whether you are a rising professional or a seasoned executive, The Charly Method guides you in becoming a more authentic, impactful, and fulfilled leader. 
            We empower you to cultivate a leadership style that is not only effective, but profoundly human.
          </p>
        </div>
        <div className="md:w-1/2 relative p-4 bg-white rounded-xl shadow-lg">
          <img src={logo} alt="The Charly Method Logo" className="rounded-xl shadow-md w-full" />
          <div className="absolute inset-0 opacity-20 rounded-xl"></div>
        </div>
      </div>
    </div>
  </section>
);

export default About;