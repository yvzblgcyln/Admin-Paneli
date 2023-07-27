import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import WarningModal from "../elements/WarningModal";

function EditModal({ modalOpen, setModalOpen, action, data }) {
  const [inputs, setInputs] = useState({ cloud_modules: [1, 2, 6] });

  //sayfa değişince seçili kutular gelmesi için
  useEffect(() => {
    var temp = [...checkOptions];
    inputs.cloud_modules?.map((id) => (temp[id - 1] = { id: temp[id - 1].id, value: true, name: temp[id - 1].name }));
    setIsCheckOptions(temp);
  }, []);

  const [checkOptions, setIsCheckOptions] = useState([
    { id: 1, value: false, name: t("plan-management") },
    { id: 2, value: false, name: t("project-management") },
    { id: 3, value: false, name: t("support-management") },
    { id: 4, value: false, name: t("permit-management") },
    { id: 5, value: false, name: t("performance-management") },
    { id: 6, value: false, name: t("cv-management") },
    { id: 7, value: false, name: t("budget-management") },
  ]);

  const handleClose = () => setModalOpen(false);

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
      setWarningModal(true);
    }
  };

  const [warningModal, setWarningModal] = useState(false);

  const submitAction = () => {
    toast.success(t("succes-edit-module"));
    console.log(inputs);
    setWarningModal(false);
    handleClose();
  };

  return (
    <Modal show={modalOpen} onHide={handleClose} centered>
      <WarningModal
        modalOpen={warningModal}
        setModalOpen={setWarningModal}
        text={t("approve-premium")}
        action={submitAction}
      />
      <Modal.Body>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ gap: 25, padding: "25px 20px 10px 20px" }}
        >
          <h3 style={{ textAlign: "center" }}>{t("edit-module")}</h3>
          <form className="d-flex flex-column" onSubmit={handleSubmit} style={{ width: "100%" }}>
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
            <div className="d-flex justify-content-between" style={{ padding: "15px 25px", marginTop: 10 }}>
              <Button variant="danger" onClick={handleClose} style={{ float: "left" }}>
                {t("close")}
              </Button>
              <Button variant="success" type="submit" style={{ float: "right" }}>
                {t("save")}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default EditModal;
