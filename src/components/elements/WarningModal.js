import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { t } from "i18next";

function WarningModal({ modalOpen, setModalOpen, text, action }) {
  const handleClose = () => setModalOpen(false);
  const handleAccept = () => {
    action();
    handleClose();
  };

  return (
    <Modal show={modalOpen} onHide={handleClose} centered>
      <Modal.Body>
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ gap: 25, padding: "25px 10px 10px 10px" }}
        >
          <img src="/question-mark.png" alt="" style={{ width: 100, height: 100 }} />
          <h3 style={{ textAlign: "center" }}>{text}</h3>
        </div>
      </Modal.Body>

      <div style={{ padding: "15px 25px" }}>
        <Button variant="danger" onClick={handleClose} style={{ float: "left" }}>
          {t("close")}
        </Button>
        <Button variant="success" onClick={handleAccept} style={{ float: "right" }}>
          {t("approve")}
        </Button>
      </div>
    </Modal>
  );
}

export default WarningModal;
