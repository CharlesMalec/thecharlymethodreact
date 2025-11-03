import React from "react";
import logo from "../images/logo.png";
import AboutText from "./AboutText";
import Human from "./Human";

const About = () => (
  <section id="about" className="py-20 md:py-32 bg-white scroll-mt-20">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
        About The Charly Method
      </h2>

      <div className="flex flex-col md:flex-row items-center md:space-x-12">
        <AboutText />
        <figure className="md:w-1/2 relative p-4 bg-white rounded-xl shadow-lg">
          <img
            src={logo}
            alt="The Charly Method Logo"
            className="rounded-xl shadow-md w-full"
          />
          <figcaption className="sr-only">
            The Charly Method logo representing human-centered leadership.
          </figcaption>
        </figure>
      </div>

      {/* HUMAN framework section */}
      <Human />

      {/* Optional CTA below HUMAN section */}
      <div className="text-center mt-12">
        <a
          href="#contact"
          className="inline-block bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-primary-dark transition"
        >
          Start Your Leadership Journey
        </a>
      </div>
    </div>
  </section>
);

export default About;
