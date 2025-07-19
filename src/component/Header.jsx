import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import mygoLogo from "../assets/logo_mygo.webp";
import aveMujicaLogo from "../assets/Ave_Mujica_logo.webp";
import headerBackground1 from "../assets/mygo-bg.webp";
import headerBackground2 from "../assets/ave-mujica-bg.jpg";

const Header = () => {
  // get current date to decide which background image to use
  const date = new Date().getDate();

  // useTranslation hook is used to handle translations in the application
  const [t, i18n] = useTranslation("global");

  // This effect sets the language based on the browser's language setting
  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase();
    i18n.changeLanguage(browserLanguage === "zh" ? "zh" : "en");
  }, []);

  return (
    <>
      <header class="relative bg-gray-400 bg-opacity-0 top-0 w-full z-10 h-40">
        <img
          class="object-cover w-full z-10 h-40 opacity-50"
          src={`${date % 2 == 0 ? headerBackground1 : headerBackground2}`}
        />
        <div class="absolute inset-0 px-1 mx-auto max-w-7xl sm:px-5 lg:px-8 flex lg:flex-1 justify-between">
          <div class="align-middle my-auto">
            <img
              class="h-10 w-auto md:h-15 lg:h-20 opacity-70"
              src={aveMujicaLogo}
            />
          </div>
          <div class="text-gray-800 font-serif text-center my-auto text-sm md:text-xl lg:text-3xl">
            <div>一生、バンドしてくれる？</div>
            <div>{t("header.title")}</div>
          </div>
          <div class="align-middle my-auto">
            <img
              class="h-10 w-auto md:h-15 lg:h-20 opacity-70"
              src={mygoLogo}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
