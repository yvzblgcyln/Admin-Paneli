import React, { useState } from "react";
import styles from "@/styles/create-company/MultiStepForm.module.css";
import { t } from "i18next";

function MultiStepForm({ activePage, setActivePage, isClickable }) {
  const activeColor = "rgb(115, 230, 122)";

  return (
    <div className={styles["container"]}>
      <div className={styles["line"]} style={{ backgroundColor: activePage > 0 && activeColor }}></div>
      <div className={styles["text-cont"]}>
        <span style={{ color: activePage > 1 && "grey" }}>{t("company-info")}</span>
        <div
          className={styles["icon-cont"]}
          style={{ backgroundColor: activePage > 0 && activeColor }}
          onClick={() => setActivePage(1)}
        >
          {activePage < 2 ? (
            <img src="/1.png" alt="" />
          ) : (
            <img src="/check.png" alt="" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
      <div className={styles["line"]} style={{ backgroundColor: activePage > 1 && activeColor }}></div>
      <div className={styles["text-cont"]}>
        <span style={{ color: activePage > 2 && "grey" }}>{t("pick-module")}</span>
        <div
          className={styles["icon-cont"]}
          style={{ backgroundColor: activePage > 1 && activeColor }}
          onClick={() => isClickable?.page2 && setActivePage(2)}
        >
          {activePage < 3 ? (
            <img src="/2.png" alt="" />
          ) : (
            <img src="/check.png" alt="" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
      <div className={styles["line"]} style={{ backgroundColor: activePage > 2 && activeColor }}></div>
      <div className={styles["text-cont"]}>
        <span style={{ color: activePage > 3 && "grey" }}>{t("auth-person")}</span>
        <div
          className={styles["icon-cont"]}
          style={{ backgroundColor: activePage > 2 && activeColor }}
          onClick={() => isClickable?.page3 && setActivePage(3)}
        >
          {activePage < 4 ? (
            <img src="/3.png" alt="" />
          ) : (
            <img src="/check.png" alt="" style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
      <div className={styles["line"]} style={{ backgroundColor: activePage > 3 && activeColor }}></div>
    </div>
  );
}

export default MultiStepForm;
