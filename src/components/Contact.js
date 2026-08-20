import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const Contact = () => {
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const messageData = {
        name: formData.get("name") || "",
        email: (formData.get("email") || "").toLowerCase().trim(),
        message: formData.get("message") || "",
        submittedAt: new Date().toISOString(),
      };

      // Store contact request in Firestore under 'contact_messages'
      try {
        await addDoc(collection(db, "contact_messages"), messageData);
      } catch (dbError) {
        console.warn("Firestore save fallback:", dbError);
        // Save to localStorage as backup
        const existing = JSON.parse(localStorage.getItem("contact_messages") || "[]");
        existing.push(messageData);
        localStorage.setItem("contact_messages", JSON.stringify(existing));
      }
      setRedirect(true);
    } catch (error) {
      console.error("Submit error:", error);
      setRedirect(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // If redirect flag is true, render ThankYou page
  if (redirect) {
    return <Navigate to="/thank-you" replace />;
  }

  return (
    <section id="contact" className="py-12 landscape:py-10 sm:py-20 lg:py-28 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* ---------- TITLE ---------- */}
        <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3">
          <span>☕ First 60 Minutes Free</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-primary tracking-tight">
          Let’s Start a Conversation
        </h2>

        {/* ---------- INTRO TEXT ---------- */}
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Whether you are facing a difficult decision, looking to grow in your career, or just curious about how we can work together, I’d love to hear from you. Every conversation is confidential, friendly, and focused entirely on you.
        </p>

        {/* ---------- CONTACT FORM ---------- */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 text-left border border-gray-100"
        >
          {/* Name field */}
          <div className="mb-5 sm:mb-6">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="e.g. Alex Dupont"
              className="w-full px-4 py-3 sm:py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              required
            />
          </div>

          {/* Email field */}
          <div className="mb-5 sm:mb-6">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@company.com"
              className="w-full px-4 py-3 sm:py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              required
            />
          </div>

          {/* Message field */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
              Your Message or Challenge
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Tell me a bit about what is on your mind or what you are trying to solve..."
              className="w-full px-4 py-3 sm:py-3.5 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 min-h-[48px] text-base cursor-pointer shadow-md ${
              isSubmitting ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending Message...</span>
              </>
            ) : (
              <span>Send Message & Book Virtual Coffee</span>
            )}
          </button>
        </form>

        {/* ---------- FOOTER TEXT ---------- */}
        <p className="text-gray-500 mt-6 text-xs sm:text-sm">
          I respond personally within 24 hours — let’s start the conversation.
        </p>

        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:text-secondary font-semibold text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
