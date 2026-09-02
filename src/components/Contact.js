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
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useLanguage } from "../context/LanguageContext";

const BOOKING_LINKS = {
  freeDiscovery: "https://calendar.app.google/tk1oDEHdN3R6oTbP8",
  followUp: "https://calendar.app.google/yvQLfSAUUMLP99ma8",
  embeddedAll: "https://calendar.google.com/calendar/appointments/AcZssZ3TS045grJY-EhH0dB-Zgwim9qW0zHg9jCcMaA=?gv=true"
};

const Contact = () => {
  const { t } = useLanguage();
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
            <span>{t.contact.badge}</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4">
            {t.contact.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        {/* ---------- 2 MAIN BOOKING CARDS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-10 sm:mb-14">
          
          {/* CARD 1: NEW CLIENT / FREE DISCOVERY */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl shadow-xs">
              {t.contact.card1Pill}
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100/80 flex items-center justify-center text-secondary mb-5">
                <UserCheck className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                {t.contact.card1Title}
              </h2>
              
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-secondary mb-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{t.contact.card1Duration}</span>
                </span>
                <span>•</span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                  {t.contact.card1Cost}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {t.contact.card1Desc}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card1Point1}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card1Point2}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card1Point3}</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 border-t border-gray-100 flex flex-col items-center gap-2">
              <a
                href={BOOKING_LINKS.freeDiscovery}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-primary text-white font-bold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                <span>{t.contact.card1BookBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("free");
                  const el = document.getElementById("calendar-frame");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-secondary hover:text-amber-800 transition flex items-center justify-center space-x-1 cursor-pointer text-center"
              >
                <span>{t.contact.card1ViewAgendaBtn}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CARD 2: RETURNING CLIENT / FOLLOW-UP */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-bl-xl border-l border-b border-gray-200">
              {t.contact.card2Pill}
            </div>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100/80 flex items-center justify-center text-primary mb-5">
                <RotateCw className="w-6 h-6" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-primary mb-2">
                {t.contact.card2Title}
              </h2>
              
              <div className="flex items-center space-x-3 text-xs sm:text-sm font-semibold text-primary mb-4">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{t.contact.card2Duration}</span>
                </span>
                <span>•</span>
                <span className="bg-blue-50 text-primary px-2 py-0.5 rounded-md border border-blue-200">
                  {t.contact.card2Cost}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {t.contact.card2Desc}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-gray-600 mb-6">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card2Point1}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card2Point2}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t.contact.card2Point3}</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 border-t border-gray-100 flex flex-col items-center gap-2">
              <a
                href={BOOKING_LINKS.followUp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-primary text-white font-bold rounded-full hover:bg-indigo-700 transition flex items-center justify-center space-x-2 text-sm shadow-md hover:shadow-lg cursor-pointer text-center"
              >
                <span>{t.contact.card2BookBtn}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("followup");
                  const el = document.getElementById("calendar-frame");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2 px-3 text-xs font-semibold text-gray-500 hover:text-primary transition flex items-center justify-center space-x-1 cursor-pointer text-center"
              >
                <span>{t.contact.card2ViewAgendaBtn}</span>
                <ChevronDown className="w-3.5 h-3.5" />
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
                <h3 className="font-bold text-base sm:text-lg">{t.contact.calendarHeaderTitle}</h3>
                <p className="text-xs text-gray-300">{t.contact.calendarHeaderDesc}</p>
              </div>
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-white/10 p-1 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("free")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "free"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t.contact.calendarTabFree}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("followup")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "followup"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t.contact.calendarTabFollowup}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  activeTab === "all"
                    ? "bg-amber-400 text-slate-950 font-bold shadow-xs"
                    : "text-white hover:text-amber-200"
                }`}
              >
                {t.contact.calendarTabAll}
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
              <span>{t.contact.calendarFooterSecurity}</span>
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
              className="font-semibold text-primary hover:text-secondary inline-flex items-center space-x-1 cursor-pointer"
            >
              <span>{t.contact.calendarFooterOpenNew}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ---------- WRITTEN CONTACT FORM SECTION ---------- */}
        <div className="bg-white shadow-xl rounded-3xl p-6 sm:p-10 border border-gray-200/80">
          <div className="text-center max-w-xl mx-auto mb-6">
            <div className="inline-flex items-center space-x-1.5 bg-blue-50 text-primary border border-blue-200 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Mail className="w-3.5 h-3.5" />
              <span>{t.contact.formBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              {t.contact.formTitle}
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              {t.contact.formSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="text-left max-w-2xl mx-auto">
            {/* Name field */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                {t.contact.nameLabel}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t.contact.namePlaceholder}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Email field */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                {t.contact.emailLabel}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder={t.contact.emailPlaceholder}
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                required
              />
            </div>

            {/* Topic selector */}
            <div className="mb-4 sm:mb-5">
              <label htmlFor="topic" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                {t.contact.topicLabel}
              </label>
              <select
                id="topic"
                name="topic"
                className="w-full px-4 py-3 text-sm sm:text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition bg-white"
              >
                <option value="Life & Career Decision">{t.contact.topicOption1}</option>
                <option value="Management Mentoring">{t.contact.topicOption2}</option>
                <option value="Team Alignment">{t.contact.topicOption3}</option>
                <option value="General Question">{t.contact.topicOption4}</option>
              </select>
            </div>

            {/* Message field */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 font-semibold mb-1.5 text-sm">
                {t.contact.messageLabel}
              </label>
              <textarea
                id="message"
                name="message"
                placeholder={t.contact.messagePlaceholder}
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
                  <span>{t.contact.sendingBtn}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center space-x-1.5 text-xs text-gray-400">
              <Lock className="w-3.5 h-3.5" />
              <span>{t.contact.securityDisclaimer}</span>
            </div>
          </form>
        </div>

        {/* ---------- FOOTER BACK LINK ---------- */}
        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:text-secondary font-semibold text-sm">
            {t.contact.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

