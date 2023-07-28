import React, { useState } from "react";
import AuthorizedPerson from "@/components/create-company/AuthorizedPerson";
import CompanyInfo from "@/components/create-company/CompanyInfo";
import ModulePick from "@/components/create-company/ModulePick";
import MultiStepForm from "@/components/create-company/MultiStepForm";
import Head from "next/head";
import { t } from "i18next";
import { checkLogin } from "@/actions/LoginActions";
import { getCloudModules } from "@/actions/CloudActions";

export default function CreateCompany({ modules, token }) {
  const [inputs, setInputs] = useState({
    membership_type: "demo",
    language: "tr",
  });
  const [activePage, setActivePage] = useState(1);
  const [isClickable, setIsClickable] = useState({
    page2: false,
    page3: false,
  });

  return (
    <>
      <Head>
        <title>{t("tab-create-company")}</title>
      </Head>
      <div>
        <MultiStepForm
          activePage={activePage}
          setActivePage={setActivePage}
          isClickable={isClickable}
        />
        {activePage === 1 ? (
          <CompanyInfo
            setActivePage={setActivePage}
            inputs={inputs}
            setInputs={setInputs}
            setIsClickable={setIsClickable}
          />
        ) : activePage === 2 ? (
          <ModulePick
            setActivePage={setActivePage}
            inputs={inputs}
            setInputs={setInputs}
            setIsClickable={setIsClickable}
            isClickable={isClickable}
            modules={modules}
          />
        ) : (
          <AuthorizedPerson
            setActivePage={setActivePage}
            inputs={inputs}
            setInputs={setInputs}
            setIsClickable={setIsClickable}
            isClickable={isClickable}
            token={token}
          />
        )}
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
  const modules = await getCloudModules(token);
  return {
    props: {
      modules,
      token,
    },
  };
}
