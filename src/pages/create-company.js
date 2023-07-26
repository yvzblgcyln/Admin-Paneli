import AuthorizedPerson from "@/components/create-company/AuthorizedPerson";
import CompanyInfo from "@/components/create-company/CompanyInfo";
import ModulePick from "@/components/create-company/ModulePick";
import MultiStepForm from "@/components/create-company/MultiStepForm";
import React, { useState } from "react";

export default function CreateCompany() {
  const [inputs, setInputs] = useState({ membership_type: "demo", language: "tr" });
  const [activePage, setActivePage] = useState(1);
  const [isClickable, setIsClickable] = useState({ page2: false, page3: false });

  return (
    <div>
      <MultiStepForm activePage={activePage} setActivePage={setActivePage} isClickable={isClickable} />
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
        />
      ) : (
        <AuthorizedPerson
          setActivePage={setActivePage}
          inputs={inputs}
          setInputs={setInputs}
          setIsClickable={setIsClickable}
          isClickable={isClickable}
        />
      )}
    </div>
  );
}
