import React from "react";
import styles from "@/styles/layouts/Footer.module.css";
import { t } from "i18next";

function Footer() {
  return (
    <div className={styles["container"]}>
      <span>{t("footer")}</span>
    </div>
  );
}

export default Footer;
