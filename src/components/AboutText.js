import React from "react";
import { useLanguage } from "../context/LanguageContext";

const AboutText = () => {
  const { t } = useLanguage();

  return (
    <div className="lg:w-1/2 space-y-4 sm:space-y-5 text-gray-700 text-base sm:text-lg leading-relaxed">
      <p>{t.about.bio1}</p>
      <p>{t.about.bio2}</p>
      <p>{t.about.bio3}</p>
      <p className="font-medium text-primary">{t.about.bio4}</p>
    </div>
  );
};

export default AboutText;
