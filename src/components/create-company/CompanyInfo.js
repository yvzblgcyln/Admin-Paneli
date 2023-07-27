import styles from "@/styles/create-company/Forms.module.css";
import React, { useState } from "react";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function CompanyInfo({ setActivePage, inputs, setInputs, setIsClickable }) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDemo, setIsValidDemo] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e) => {
    setInputs({ ...inputs, email: e.target.value });
    const isValid = emailRegex.test(e.target.value);
    setIsValidEmail(isValid);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (e.target.name === "name") {
      setIsValidName(e.target.value);
    } else if (e.target.name === "days") {
      setIsValidDemo(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs.name && !inputs.days && !inputs.email) {
      setIsValidEmail(inputs.email);
    } else if (isValidEmail) {
      console.log(inputs);
      setIsClickable((prev) => ({ ...prev, page2: true }));
      setActivePage((prev) => prev + 1);
    }

    if (!inputs.name || !inputs.days) {
      toast.warning(t("fill-requierd-fields"));
      setIsValidName(inputs.name);
      setIsValidDemo(inputs.days);
    } else if (!inputs.email || !isValidEmail) {
      toast.warning(t("make-sure-mail"));
    }
  };

  return (
    <div className={styles["container"]}>
      <div style={{ maxWidth: 600, width: "100%", marginTop: 80 }}>
        <h3 style={{ textAlign: "center", marginBottom: 20 }}>{t("company-info")}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("comp-name")}</label>
            <input
              name="name"
              value={inputs?.name}
              className={`form-control ${!isValidName && "is-invalid"}`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("comp-mail")}</label>
            <input
              value={inputs?.email}
              type="email"
              onChange={handleEmailChange}
              className={`form-control ${!isValidEmail && "is-invalid"}`}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("comp-lang")}</label>
            <select
              name="language"
              value={inputs?.language}
              id="inputState"
              className="form-control"
              onChange={handleChange}
            >
              <option value={"tr"}>{t("tr")}</option>
              <option value={"en"}>{t("en")}</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">{t("membership-type")}</label>
            <select
              name="membership_type"
              value={inputs?.membership_type}
              id="inputState"
              className="form-control"
              onChange={handleChange}
            >
              <option value={"demo"}>Demo</option>
              <option value={"premium"}>Premium</option>
            </select>
          </div>
          {inputs?.membership_type === "demo" && (
            <div className="mb-3">
              <label className="form-label">{t("demo-period")}</label>
              <input
                name="days"
                type="number"
                value={inputs?.days}
                className={`form-control ${!isValidDemo && "is-invalid"}`}
                onChange={handleChange}
              />
            </div>
          )}

          <Button type="submit" style={{ float: "right" }}>
            {t("next")}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CompanyInfo;
