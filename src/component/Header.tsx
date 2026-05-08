import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import mygoLogo from "../assets/logo_mygo.webp";
import aveMujicaLogo from "../assets/Ave_Mujica_logo.webp";
import headerBackground1 from "../assets/mygo-bg.webp";
import headerBackground2 from "../assets/ave-mujica-bg.jpg";

const Header = () => {
  const date = new Date().getDate();
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase();
    i18n.changeLanguage(browserLanguage === "zh" ? "zh" : "en");
  }, [i18n]);

  return (
    <>
      <header className="relative bg-gray-400 bg-opacity-0 top-0 w-full z-10 h-40">
        <img
          className="object-cover w-full z-10 h-40 opacity-50"
          src={date % 2 === 0 ? headerBackground1 : headerBackground2}
        />
        <div className="absolute inset-0 px-1 mx-auto max-w-7xl sm:px-5 lg:px-8 flex lg:flex-1 justify-between">
          <div className="align-middle my-auto">
            <img
              className="h-10 w-auto md:h-15 lg:h-20 opacity-70"
              src={aveMujicaLogo}
            />
          </div>
          <div className="text-gray-800 font-serif text-center my-auto text-sm md:text-xl lg:text-3xl">
            <div>一生、バンドしてくれる？</div>
            <div>{t("header.title")}</div>
          </div>
          <div className="align-middle my-auto">
            <img
              className="h-10 w-auto md:h-15 lg:h-20 opacity-70"
              src={mygoLogo}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
