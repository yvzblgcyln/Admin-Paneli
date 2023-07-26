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

export default function App({ Component, pageProps }) {
  const { t, i18n } = useTranslation();
  if (Component.getLayout) return Component.getLayout(<Component {...pageProps} />);

  return (
    <Provider store={store}>
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
