import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import global_en from "./translation/en/global.json";
import global_zh from "./translation/zh/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

i18next.init({
  interpolation: {
    escapeValue: false,
  },
  lng: "zh",
  resources: {
    en: {
      global: global_en,
    },
    zh: {
      global: global_zh,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </StrictMode>
);
