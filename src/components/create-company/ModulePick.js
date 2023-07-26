import styles from "@/styles/create-company/Forms.module.css";
import React, { useEffect, useState } from "react";
import { t } from "i18next";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ModulePick({ setActivePage, inputs, setInputs, setIsClickable }) {
  const [checkOptions, setIsCheckOptions] = useState([
    { id: 1, value: false, name: t("plan-management") },
    { id: 2, value: false, name: t("project-management") },
    { id: 3, value: false, name: t("support-management") },
    { id: 4, value: false, name: t("permit-management") },
    { id: 5, value: false, name: t("performance-management") },
    { id: 6, value: false, name: t("cv-management") },
    { id: 7, value: false, name: t("budget-management") },
  ]);

  //sayfa değişince seçili kutular gelmesi için
  useEffect(() => {
    var temp = [...checkOptions];
    inputs.cloud_modules?.map((id) => (temp[id - 1] = { id: temp[id - 1].id, value: true, name: temp[id - 1].name }));
    setIsCheckOptions(temp);
  }, []);

  const handleChange = (id) => {
    //seçilen id kutusu değişir
    var temp = [...checkOptions];
    temp.map((data) => {
      if (data.id === id) temp[id - 1] = { id: data.id, value: !data.value, name: data.name };
    });
    setIsCheckOptions(temp);

    // kutu seçildikçe input da değişir
    var tempIds = [];
    temp.filter(({ value, id }) => value && tempIds.push(id));
    setInputs({ ...inputs, cloud_modules: tempIds });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tempIds = checkOptions.filter((item) => item.value);
    if (!tempIds.length) {
      toast.warning(t("choose-at-least-one"));
    } else {
      console.log(inputs);
      setIsClickable((prev) => ({ ...prev, page3: true }));
      setActivePage((prev) => prev + 1);
    }
  };

  return (
    <div className={styles["container"]}>
      <div style={{ maxWidth: 600, width: "100%", marginTop: 80 }}>
        <h3 style={{ textAlign: "center", marginBottom: 20 }}>{t("pick-module")}</h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          {checkOptions.map((option) => (
            <div class="form-check form-check-inline" key={option.id}>
              <input
                className="form-check-input"
                type="checkbox"
                checked={option.value}
                id={option.id}
                value={option.id}
                onChange={() => handleChange(option.id)}
              />
              <label className="form-check-label" for={option.id} style={{ transform: "translateY(0)" }}>
                {option.name}
              </label>
            </div>
          ))}

          <div style={{ marginTop: 20 }}>
            <Button onClick={() => setActivePage(1)} style={{ float: "left" }}>
              {t("before")}
            </Button>
            <Button type="submit" style={{ float: "right" }}>
              {t("next")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModulePick;
