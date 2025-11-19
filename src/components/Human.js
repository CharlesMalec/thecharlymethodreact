import React from "react";
import { FaAssistiveListeningSystems, FaUserAlt, FaBullseye, FaHandsHelping, FaSeedling } from "react-icons/fa";

const principles = [
  {
    letter: "H",
    title: "Hear actively",
    text: "Great managers listen before they act. Active listening builds trust, ensures people feel valued, and helps leaders understand unspoken needs.",
    icon: <FaAssistiveListeningSystems className="text-[#0B2C54] text-4xl" />,
  },
  {
    letter: "U",
    title: "Understand uniqueness",
    text: "Every team member has different strengths, motivations, and ways of working. Recognizing and embracing these differences fosters inclusion and unleashes hidden potential.",
    icon: <FaUserAlt className="text-[#F4A300] text-4xl" />,
  },
  {
    letter: "M",
    title: "Motivate with meaning",
    text: "Instead of only pushing targets, connect work to purpose. When people see how their contribution matters, they naturally engage more deeply.",
    icon: <FaBullseye className="text-[#0B2C54] text-4xl" />,
  },
  {
    letter: "A",
    title: "Align with empathy",
    text: "Empathy bridges personal goals with organizational ones. Aligning expectations while respecting individual realities creates both accountability and compassion.",
    icon: <FaHandsHelping className="text-[#F4A300] text-4xl" />,
  },
  {
    letter: "N",
    title: "Nurture growth",
    text: "Human-centered management invests in continuous learning and development. By nurturing growth, leaders empower people to evolve alongside the company.",
    icon: <FaSeedling className="text-[#0B2C54] text-4xl" />,
  },
];

const Human = () => (
  <section id="human" className="py-20 md:py-32 bg-white">
    <div className="container mx-auto px-4 max-w-6xl">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-primary">
        The HUMAN Framework - Core values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {principles.map((item) => (
          <div
            key={item.letter}
            className="flex items-start bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mr-6">
              {item.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#0B2C54] mb-2">
                {item.letter} – {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Human;