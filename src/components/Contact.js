import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { 
  Coffee, 
  Send, 
  Lock, 
  Calendar, 
  Clock, 
  UserCheck, 
  RotateCw, 
  ExternalLink, 
  Mail, 
  CheckCircle2
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const BOOKING_LINKS = {
  freeDiscovery: "https://calendar.app.google/tk1oDEHdN3R6oTbP8",
  followUp: "https://calendar.app.google/yvQLfSAUUMLP99ma8",
  embeddedAll: "https://calendar.google.com/calendar/appointments/AcZssZ3TS045grJY-EhH0dB-Zgwim9qW0zHg9jCcMaA=?gv=true"
};

const Contact = () => {
  const [redirect, setRedirect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("free"); // 'free' | 'followup' | 'all'

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setIsSubmitting(true);

    try {
      const messageData = {
        name: formData.get("name") || "",
        email: (formData.get("email") || "").toLowerCase().trim(),
        topic: formData.get("topic") || "General",
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
    <div className="py-10 sm:py-16 lg:py-20 bg-gray-50/70 min-h-screen relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-primary rounded-full filter blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-72 sm:w-96 h-72 sm:h-96 glow-blob-secondary rounded-full filter blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* ---------- HEADER ---------- */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 bg-amber-50 text-secondary border border-amber-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-3.5 shadow-xs">
            <Coffee className="w-4 h-4 text-secondary" />
            <span>Instant Google Calendar Booking</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4">
            Schedule a Session or Get in Touch
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Book a dedicated time slot directly in my calendar below, or send a written note if you prefer to share your context first.
          </p>
        </div>

        {/* ---------- 2 MAIN BOOKING CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10 sm:mb-14">
          
          {/* CARD 1: NEW CLIENT / FREE DISCOVERY */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl shadow-xs">
              First Time • 100% Free
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-secondary mb-5">
                <UserCheck className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                1. First Discovery Meeting
              </h2>
              
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-secondary mb-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>60 Minutes</span>
                </span>
                <span>•</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                  Free (0€)
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A dedicated, confidential space to discuss your challenges, career crossroads, or management goals. No catch and zero sales pitch.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>1-on-1 Google Meet video call</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Immediate calendar confirmation & reminder</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Explore fit with the HUMAN framework</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <a
                href={BOOKING_LINKS.freeDiscovery}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <span>Book Free Session</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("free");
                  const el = document.getElementById("calendar-frame");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-3 px-4 bg-amber-50 text-secondary border border-amber-200 font-semibold rounded-full hover:bg-amber-100 transition text-xs sm:text-sm cursor-pointer"
              >
                View Agenda Below ↓
              </button>
            </div>
          </div>

          {/* CARD 2: RETURNING CLIENT / FOLLOW-UP */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl border-l border-b border-gray-200">
              Returning Clients
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 flex items-center justify-center text-primary mb-5">
                <RotateCw className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                2. Coaching Follow-up
              </h2>
              
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-primary mb-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>60 Minutes</span>
                </span>
                <span>•</span>
                <span className="bg-blue-50 text-primary px-2 py-0.5 rounded-md border border-blue-200">
                  100€ / hour
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Already started your coaching journey? Book your next session to review actions, work on practical cases, or keep your momentum.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Debrief experiments & progress</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Hands-on leadership & management guidance</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Standard settlement after session</span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
              <a
                href={BOOKING_LINKS.followUp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <span>Book Follow-up Session</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("followup");
                  const el = document.getElementById("calendar-frame");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="py-3 px-4 bg-gray-50 text-gray-700 border border-gray-200 font-semibold rounded-full hover:bg-gray-100 transition text-xs sm:text-sm cursor-pointer"
              >
                View Agenda Below ↓
              </button>
            </div>
          </div>

        </div>

        {/* ---------- EMBEDDED GOOGLE CALENDAR SECTION ---------- */}
        <div id="calendar-frame" className="bg-white rounded-3xl border border-gray-200/90 shadow-xl overflow-hidden mb-12 sm:mb-16">
          <div className="p-4 sm:p-6 bg-gradient-to-r from-slate-900 to-[#0B2C54] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg">Interactive Booking Calendar</h3>
                <p className="text-xs text-gray-300">Select a date and time slot that fits your schedule</p>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("free")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "free"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Free Discovery (60m)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("followup")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "followup"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                Follow-up (100€)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "all"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                All Options
              </button>
            </div>
          </div>

          {/* Iframe container */}
          <div className="relative w-full bg-white min-h-[580px] sm:min-h-[640px]">
            <iframe
              title="Google Calendar Appointment Scheduling"
              src={
                activeTab === "free"
                  ? BOOKING_LINKS.freeDiscovery
                  : activeTab === "followup"
                  ? BOOKING_LINKS.followUp
                  : BOOKING_LINKS.embeddedAll
              }
              className="w-full h-[580px] sm:h-[640px] border-0"
              frameBorder="0"
            />
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-center flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <span className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              <span>Google Calendar appointment scheduling • Automatic Google Meet link included</span>
            </span>
            <a
              href={
                activeTab === "free"
                  ? BOOKING_LINKS.freeDiscovery
                  : activeTab === "followup"
                  ? BOOKING_LINKS.followUp
                  : BOOKING_LINKS.embeddedAll
              }
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-secondary inline-flex items-center space-x-1"
            >
              <span>Open in new Google window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ---------- WRITTEN CONTACT FORM SECTION ---------- */}
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 border border-gray-200/80">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-primary border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>Prefer to write first?</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Send a Confidential Message
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              If you’d like to describe your specific situation before booking, write to me directly. I answer personally within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="text-left max-w-2xl mx-auto">
            {/* Name field */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Alex Dupont"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Email field */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@company.com"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Topic selector */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="topic" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                What is this regarding?
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
              >
                <option value="Life & Career Decision">Life & Career Decision (1-on-1)</option>
                <option value="Management Mentoring">Management & Leadership Mentoring</option>
                <option value="Team Alignment">Support for Teams</option>
                <option value="General Question">General Question or Custom Request</option>
              </select>
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                Your Message or Challenge
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me a bit about what is on your mind, what decision you are facing, or what you want to achieve..."
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                rows="4"
                required
              ></textarea>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 min-h-[48px] text-sm sm:text-base cursor-pointer shadow-md ${
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
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Confidential Message</span>
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-1.5 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Strictly confidential. No spam or unwanted promotional emails.</span>
            </div>
          </form>
        </div>

        {/* ---------- FOOTER BACK LINK ---------- */}
        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:text-secondary font-semibold text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

