import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Contact = () => {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // --- LOCAL DEV MODE ---
    if (process.env.NODE_ENV === "development") {
      console.log("💡 Simulating form submission locally...");
      setTimeout(() => setRedirect(true), 800);
      return;
    }

    // --- PRODUCTION (Netlify form submission) ---
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    })
      .then(() => setRedirect(true))
      .catch((error) => alert("⚠️ Something went wrong: " + error));
  };

  // If redirect flag is true, render ThankYou page
  if (redirect) {
    return <Navigate to="/thank-you" replace />;
  }

  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* ---------- TITLE ---------- */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
          Start Your Leadership Journey
        </h2>

        {/* ---------- INTRO TEXT ---------- */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Ready to take the next step toward{" "}
          <strong>authentic, human-centered leadership</strong>?  
          Whether you’re curious about coaching or ready to begin, I’d love to hear from you.  
          Every conversation is confidential — and focused entirely on you.
        </p>

        {/* ---------- CONTACT FORM ---------- */}
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 md:p-10 text-left"
        >
          {/* Netlify hidden input */}
          <input type="hidden" name="form-name" value="contact" />

          {/* Name field */}
          <div className="mb-6">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Email field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Message field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me about your current leadership challenges or goals..."
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition"
          >
            {process.env.NODE_ENV === "development"
              ? "Simulate Submission"
              : "Request a Discovery Call"}
          </button>
        </form>

        {/* ---------- FOOTER TEXT ---------- */}
        <p className="text-gray-500 mt-6 text-sm">
          I respond personally within 24 hours — let’s start the conversation.
        </p>

        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:text-secondary font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
