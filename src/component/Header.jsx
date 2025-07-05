import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import mygoLogo from "../assets/logo_mygo.webp";
import aveMujicaLogo from "../assets/Ave_Mujica_logo.webp";

const Header = () => {
  // useTranslation hook is used to handle translations in the application
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const browserLanguage = navigator.language.substring(0, 2).toLowerCase();
    i18n.changeLanguage(browserLanguage === "zh" ? "zh" : "en");
  }, []);

  return (
    <>
      <header class="bg-[var(--color-umiri)] bg-opacity-0 fixed top-0 w-full h-20 z-1 md:h-25 lg:h-30">
        <div class="px-1 mx-auto max-w-7xl sm:px-5 lg:px-8 flex lg:flex-1 justify-between">
          {/* <div class="px-0 mx-0 max-w-fit flex lg:flex-1 justify-between"> */}
          <div>
            <img
              class="h-10 w-auto my-5 md:h-15 lg:h-20"
              src={mygoLogo}
              alt=""
            />
          </div>
          <div class="text-gray-300 font-serif text-center my-auto text-sm md:text-xl lg:text-3xl">
            <div>一生、バンドしてくれる？</div>
            <div>{t("header.title")}</div>
          </div>
          <div>
            <img
              class="h-10 w-auto my-5 md:h-15 lg:h-20"
              src={aveMujicaLogo}
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
