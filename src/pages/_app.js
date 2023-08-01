import "@/styles/globals.css";
import "../helpers/translation/i18n";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-tooltip/dist/react-tooltip.css";
import Layout from "@/components/Layouts/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import Router from "next/router";
import Loading from "@/components/elements/Loading";

export default function App({ Component, pageProps }) {
  const { t, i18n } = useTranslation();
  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />);

  const [loading, setLoading] = useState(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    var body = document.body;
    body.classList.remove("sidebar-open");
    body.classList.add("sidebar-closed");
    setLoading(false);
  });

  return (
    <Provider store={store}>
      {loading && <Loading />}
      <Layout>
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
        <Component {...pageProps} t={(t, i18n)} />
      </Layout>
    </Provider>
  );
}
