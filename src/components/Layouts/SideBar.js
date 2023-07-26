import { FaRegUserCircle } from "react-icons/fa";
import { GrAddCircle, GrUnorderedList } from "react-icons/gr";
import styles from "@/styles/layouts/SideBar.module.css";
import { useRouter } from "next/router";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import ChangeLanguage from "../elements/ChangeLanguage";

function SideBar({}) {
  const { pathname } = useRouter();
  const router = useRouter();

  return (
    <div className={styles["container"]}>
      <div className={styles["user-container"]}>
        <FaRegUserCircle size={30} />
        <div>UserName</div>
      </div>
      <div>
        <div
          className={styles["menu-item"]}
          onClick={() => router.push("create-company")}
          style={{ background: pathname.includes("create-company") && "rgb(169, 201, 230)" }}
        >
          <GrAddCircle size={20} />
          <span>{t("create-company")}</span>
        </div>
        <div
          className={styles["menu-item"]}
          onClick={() => router.push("company-list")}
          style={{ background: pathname.includes("company-list") && "rgb(169, 201, 230)" }}
        >
          <GrUnorderedList size={20} />
          <span>{t("company-list")}</span>
        </div>
        <div className="d-flex justify-content-between " style={{ margin: "0 10px" }}>
          <span>dil değiştri</span>
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
