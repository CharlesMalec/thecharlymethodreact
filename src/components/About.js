import React from "react";
import logo from "../images/logo.png";
import AboutText from "./AboutText";
import Human from "./Human";

const About = () => (
  <section id="about" className="py-20 md:py-32 bg-white">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
        About Our Method
      </h2>
      <div className="flex flex-col md:flex-row items-center md:space-x-12">
        <AboutText />
        <div className="md:w-1/2 relative p-4 bg-white rounded-xl shadow-lg">
          <img
            src={logo}
            alt="The Charly Method Logo"
            className="rounded-xl shadow-md w-full"
          />
          <div className="absolute inset-0 opacity-20 rounded-xl"></div>
        </div>
      </div>

      {/* Insert HUMAN section after the about content */}
      <Human />
    </div>
  </section>
);

export default About;
