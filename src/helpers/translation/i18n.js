import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./locales/en/common.json";
import translationTr from "./locales/tr/common.json";

i18n.use(initReactI18next).init({
  resources: {
    EN: { translation: translationEn },
    TR: { translation: translationTr },
  },
  keySeparator: ".",
  fallbackLng: "TR",
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    useSuspense: false,
  },
});
export default i18n;
