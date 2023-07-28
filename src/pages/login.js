import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import ChangeLanguage from "@/components/elements/ChangeLanguage";
import { checkLogin, login } from "@/actions/LoginActions";
import cookie from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [inputs, setInputs] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(inputs);
    if (response.status === "success") {
      cookie.set("token", response.token, { expires: 30 });
      window.location.href = "/";
    } else {
      toast.error(t("login-error"));
    }
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className={styles["login-container"]}>
        <h3>{t("login-screen")}</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">{t("username")}</label>
            <input
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="username"
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("password")}</label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="*****"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-between">
            <ChangeLanguage />
            <Button type="submit">{t("login")}</Button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

Login.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const isLogged = await checkLogin(token);
  if (isLogged) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
