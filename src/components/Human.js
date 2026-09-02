import React from "react";
import { FaAssistiveListeningSystems, FaUserAlt, FaBullseye, FaHandsHelping, FaSeedling } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const Human = () => {
  const { t } = useLanguage();

  const principles = [
    {
      letter: "H",
      title: t.human.h_title,
      text: t.human.h_text,
      icon: <FaAssistiveListeningSystems className="text-[#0B2C54] text-4xl" />,
    },
    {
      letter: "U",
      title: t.human.u_title,
      text: t.human.u_text,
      icon: <FaUserAlt className="text-[#F4A300] text-4xl" />,
    },
    {
      letter: "M",
      title: t.human.m_title,
      text: t.human.m_text,
      icon: <FaBullseye className="text-[#0B2C54] text-4xl" />,
    },
    {
      letter: "A",
      title: t.human.a_title,
      text: t.human.a_text,
      icon: <FaHandsHelping className="text-[#F4A300] text-4xl" />,
    },
    {
      letter: "N",
      title: t.human.n_title,
      text: t.human.n_text,
      icon: <FaSeedling className="text-[#0B2C54] text-4xl" />,
    },
  ];

  return (
    <section id="human" className="py-8 landscape:py-6 sm:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-8 sm:mb-12 text-center text-primary tracking-tight">
          {t.human.title}
        </h3>
        <div className="grid grid-cols-1 landscape:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {principles.map((item) => (
            <div
              key={item.letter}
              className="flex items-start bg-gray-50/70 border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-md transition"
            >
              <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-white border border-gray-200/80 mr-4 sm:mr-6 shadow-xs">
                {item.icon}
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-primary mb-1.5">
                  {item.letter} – {item.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Human;