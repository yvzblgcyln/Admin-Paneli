import { FaRegUserCircle } from "react-icons/fa";
import { GrAddCircle, GrUnorderedList } from "react-icons/gr";
import styles from "@/styles/layouts/SideBar.module.css";
import { useRouter } from "next/router";
import { t } from "i18next";
import ChangeLanguage from "../elements/ChangeLanguage";
import { useSelector } from "react-redux";

function SideBar({}) {
  const { pathname } = useRouter();
  const router = useRouter();

  const { SideBarOpen } = useSelector((state) => state.general);

  return (
    <div
      className={styles["container"]}
      style={{ width: SideBarOpen ? 300 : 0, padding: SideBarOpen ? "15px" : "15px 0" }}
    >
      <div className={styles["user-container"]}>
        <FaRegUserCircle size={30} />
        <div>UserName</div>
      </div>
      <div className="d-flex flex-column justify-content-between " style={{ height: "100%", minWidth: 210 }}>
        <div>
          <div
            className={styles["menu-item"]}
            onClick={() => router.push("/create-company")}
            style={{ background: pathname.includes("create-company") && "rgb(169, 201, 230)" }}
          >
            <GrAddCircle size={20} />
            <span>{t("create-company")}</span>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => router.push("/company-list")}
            style={{ background: pathname.includes("company-list") && "rgb(169, 201, 230)" }}
          >
            <GrUnorderedList size={20} />
            <span>{t("company-list")}</span>
          </div>
        </div>
        <div className="d-flex justify-content-between " style={{ margin: "0 10px", minWidth: 208 }}>
          <span>{t("change-lang")}</span>
          <ChangeLanguage />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
