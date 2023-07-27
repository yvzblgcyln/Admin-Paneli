import Head from "next/head";
import { t } from "i18next";

export default function Home() {
  return (
    <>
      <Head>
        <title>{t("tab-home")}</title>
      </Head>
      <h1 className="d-flex d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
        {t("welcome")}
      </h1>
    </>
  );
}
