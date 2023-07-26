import React from "react";
import { AiFillHome } from "react-icons/ai";
import { GrLogout } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/layouts/Navbar.module.css";
import { useRouter } from "next/router";
import { Tooltip } from "react-tooltip";
import { t } from "i18next";

function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("login");
  };

  return (
    <div className={styles["container"]}>
      <Tooltip id="menu" />
      <Tooltip id="home" />
      <Tooltip id="logout" style={{ zIndex: 1 }} />
      <div className="d-flex" style={{ gap: 10 }}>
        <GiHamburgerMenu
          data-tooltip-id="menu"
          data-tooltip-content={t("menu")}
          size={30}
          style={{ cursor: "pointer", marginTop: 2 }}
        />

        <AiFillHome
          data-tooltip-id="home"
          data-tooltip-content={t("home")}
          size={30}
          onClick={() => router.push("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <GrLogout
        data-tooltip-id="logout"
        data-tooltip-content={t("logout")}
        size={30}
        onClick={handleLogout}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
}

export default Navbar;
