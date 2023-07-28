import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import ChangeLanguage from "@/components/elements/ChangeLanguage";

export default function Login() {
  const [inputs, setInputs] = useState({});
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(inputs);
    router.push("/");
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className={styles["login-container"]}>
        <h3>{t("login-screen")}</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{t("username")}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="username"
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("password")}</label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="*****"
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>
          <div className="d-flex justify-content-between">
            <ChangeLanguage />
            <Button type="submit">{t("login")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return <>{page}</>;
};
