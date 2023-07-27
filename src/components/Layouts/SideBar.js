import { FaRegUserCircle } from "react-icons/fa";
import { GrAddCircle, GrUnorderedList } from "react-icons/gr";
import styles from "@/styles/layouts/SideBar.module.css";
import { useRouter } from "next/router";
import { t } from "i18next";
import ChangeLanguage from "../elements/ChangeLanguage";
import { useDispatch, useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi";
import { setSideBarOpen } from "@/redux/GeneralSlice";

function SideBar({}) {
  const { SideBarOpen } = useSelector((state) => state.general);
  const { pathname } = useRouter();
  const router = useRouter();
  const dispatch = useDispatch();

  const closeMenu = () => {
    dispatch(setSideBarOpen());
  };

  return (
    <div
      className={styles["container"]}
      style={{ width: SideBarOpen ? 300 : 0, padding: SideBarOpen ? "15px" : "15px 0" }}
    >
      <div className={styles["user-area"]}>
        <div className={styles["user-container"]}>
          <FaRegUserCircle size={30} />
          <div>UserName</div>
        </div>
        <GiHamburgerMenu
          data-tooltip-id="menu"
          data-tooltip-content={!SideBarOpen ? t("show-menu") : t("hide-menu")}
          size={30}
          style={{ cursor: "pointer", marginTop: 2 }}
          onClick={() => closeMenu()}
        />
      </div>
      <div className="d-flex flex-column justify-content-between " style={{ height: "100%", minWidth: 210 }}>
        <div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              router.push("/create-company");
              closeMenu();
            }}
            style={{ background: pathname.includes("create-company") && "rgb(169, 201, 230)" }}
          >
            <GrAddCircle size={20} />
            <span>{t("create-company")}</span>
          </div>
          <div
            className={styles["menu-item"]}
            onClick={() => {
              router.push("/company-list");
              closeMenu();
            }}
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
