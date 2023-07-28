import Head from "next/head";
import { t } from "i18next";
import Link from "next/link";
import { checkLogin } from "@/actions/LoginActions";

export default function Home() {
  return (
    <>
      <Head>
        <title>{t("tab-home")}</title>
      </Head>
      <div
        className="d-flex d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100%" }}
      >
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

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  const isLogged = await checkLogin(token);
  if (!isLogged) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
