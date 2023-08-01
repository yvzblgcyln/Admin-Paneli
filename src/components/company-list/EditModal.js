import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { t } from "i18next";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import WarningModal from "../elements/WarningModal";
import { editCloudCompanyModules } from "@/actions/CloudActions";

function EditModal({
  modalOpen,
  setModalOpen,
  action,
  data,
  moduleList,
  token,
  setLoading,
}) {
  const [warningModal, setWarningModal] = useState(false);

  const [checkOptions, setCheckOptions] = useState([]);

  useEffect(() => {
    setCheckOptions(
      moduleList.map((item) => ({
        ...item,
        value: data.modules.includes(item.id),
      }))
    );
  }, [modalOpen]);

  const handleClose = () => setModalOpen(false);

  const handleChange = (id) => {
    let temp = [...checkOptions];
    let index = temp.findIndex((item) => item.id == id);
    temp[index]["value"] = !temp[index]["value"];
    setCheckOptions(temp);
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

  const submitAction = async () => {
    let body = {
      cloud_company_id: data.id,
      cloud_modules: checkOptions
        .filter((item) => item.value == true)
        .map((item) => item.id),
    };
    setLoading(true);
    let response = await editCloudCompanyModules(token, body);
    setLoading(false);
    if (response.status === "success") {
      toast.success(t("succes-edit-module"));
      setWarningModal(false);
      handleClose();
      await action();
    } else {
      toast.error(t("unexpected-error"));
    }
  };

  return (
    <Modal show={modalOpen} onHide={handleClose} centered>
      <WarningModal
        modalOpen={warningModal}
        setModalOpen={setWarningModal}
        text={t("approve-module")}
        action={submitAction}
      />
      <Modal.Body>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ gap: 25, padding: "25px 20px 10px 20px" }}
        >
          <h3 style={{ textAlign: "center" }}>{t("module-list")}</h3>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit}
            style={{ width: "100%" }}
          >
            {checkOptions.map((option) => (
              <div className="form-check form-check-inline" key={option.id}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={option.value}
                  id={option.id}
                  value={option.id}
                  onChange={() => handleChange(option.id)}
                />
                <label
                  className="form-check-label"
                  for={option.id}
                  style={{ transform: "translateY(0)" }}
                >
                  {option.name}
                </label>
              </div>
            ))}
            <div
              className="d-flex justify-content-between"
              style={{ padding: "15px 25px", marginTop: 10 }}
            >
              <Button
                variant="danger"
                onClick={handleClose}
                style={{ float: "left" }}
              >
                {t("close")}
              </Button>
              <Button
                variant="success"
                type="submit"
                style={{ float: "right" }}
              >
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
