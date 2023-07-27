import Head from "next/head";
import { t } from "i18next";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>{t("tab-home")}</title>
      </Head>
      <div className="d-flex d-flex flex-column justify-content-center align-items-center" style={{ height: "100%" }}>
        <h1>{t("welcome")}</h1>
        <Link href="/create-company" style={{ color: "black" }}>
          {t("create-company")}
        </Link>
        <Link href="/company-list" style={{ color: "black" }}>
          {t("company-list")}
        </Link>
      </div>
    </>
  );
}
