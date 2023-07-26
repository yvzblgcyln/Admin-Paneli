import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";

function ChangeLanguage() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("TR");

  useEffect(() => {
    const stored = localStorage.getItem("language");
    const defaultLanguage = window.navigator.language.includes("tr") ? "TR" : "EN";
    setLanguage(JSON.parse(stored) ? JSON.parse(stored) : defaultLanguage);
  }, []);

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
    i18n.changeLanguage(language);
  }, [language]);

  const handleChangeLanguge = () => {
    if (language === "TR") setLanguage("EN");
    else setLanguage("TR");
  };

  return (
    <div
      onClick={handleChangeLanguge}
      style={{ cursor: "pointer", width: "fit-content", display: "flex", alignItems: "center" }}
    >
      {language === "TR" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          class="rounded mr-2"
          id="flag-icon-css-tr"
          viewBox="0 0 512 512"
        >
          <g fill-rule="evenodd">
            <path fill="#e30a17" d="M0 0h512v512H0z"></path>
            <path
              fill="#fff"
              d="M348.8 264c0 70.6-58.3 127.9-130.1 127.9s-130.1-57.3-130.1-128 58.2-127.8 130-127.8S348.9 193.3 348.9 264z"
            ></path>
            <path
              fill="#e30a17"
              d="M355.3 264c0 56.5-46.6 102.3-104.1 102.3s-104-45.8-104-102.3 46.5-102.3 104-102.3 104 45.8 104 102.3z"
            ></path>
            <path
              fill="#fff"
              d="M374.1 204.2l-1 47.3-44.2 12 43.5 15.5-1 43.3 28.3-33.8 42.9 14.8-24.8-36.3 30.2-36.1-46.4 12.8-27.5-39.5z"
            ></path>
          </g>
        </svg>
      ) : (
        <img
          class="rounded mr-2"
          src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-square-250.png"
          alt="uk-flag"
          style={{ width: 24, height: 24 }}
        ></img>
      )}
    </div>
  );
}

export default ChangeLanguage;
