import styles from "@/styles/create-company/Forms.module.css";
import React, { useState } from "react";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import WarningModal from "../elements/WarningModal";
import { useRouter } from "next/router";
import Loading from "../elements/Loading";
import { createCloudCompany } from "@/actions/CloudActions";

function AuthorizedPerson({
  setActivePage,
  inputs,
  setInputs,
  setIsClickable,
  token,
}) {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setInputs({ ...inputs, related_person_email: e.target.value });
    const isValid = emailRegex.test(e.target.value);
    setIsValidEmail(isValid);
  };

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    e.target.name === "related_person_name";
    setIsValidName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputs.related_person_name && !inputs.related_person_email) {
      setIsValidName(inputs.related_person_name);
      setIsValidEmail(inputs.related_person_email);
    } else if (isValidName && isValidEmail) {
      setModalOpen(true);
    }

    if (!inputs.related_person_name) {
      toast.warning(t("fill-requierd-fields"));
    } else if (!inputs.related_person_email || !isValidEmail) {
      toast.warning(t("make-sure-mail"));
    }
  };

  const submitAction = async () => {
    setLoading(true);
    let response = await createCloudCompany(token, inputs);
    setLoading(false);
    if (response.status === "success") {
      setActivePage((prev) => prev + 1);
      toast.success(t("success-create-company"));
      setTimeout(() => {
        router.push("/company-list");
      }, 3000);
    } else if (response.status === "cloud_email_exist") {
      toast.error(t("cloud-email-exist-error"));
    } else if (response.status === "user_exist") {
      toast.error(t("user-exist-error"));
    } else {
      toast.error(t("unexpected-error"));
    }
  };

  return (
    <div className={styles["container"]}>
      {loading ? <Loading /> : null}
      <WarningModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        text={t("approve-create-company")}
        action={submitAction}
      />
      <div style={{ maxWidth: 600, width: "100%", marginTop: 80 }}>
        <h3 style={{ textAlign: "center", marginBottom: 20 }}>
          {t("auth-person")}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("auth-name")}</label>
            <input
              name="related_person_name"
              value={inputs?.related_person_name}
              className={`form-control ${!isValidName && "is-invalid"}`}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">{t("auth-mail")}</label>
            <input
              name="related_person_email"
              value={inputs?.related_person_email}
              className={`form-control ${!isValidEmail && "is-invalid"}`}
              onChange={handleEmailChange}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Button onClick={() => setActivePage(2)} style={{ float: "left" }}>
              {t("before")}
            </Button>
            <Button type="submit" style={{ float: "right" }}>
              {t("send")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthorizedPerson;
