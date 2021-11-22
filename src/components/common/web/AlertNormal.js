import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const ModalAlert = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Alert style={{ marginBottom: 0 }} variant={props.type}>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>{props.message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => props.setAlert(false)}
            variant="outline-success"
          >
            Cerrar
          </Button>
        </div>
      </Alert>
    </Modal>
  );
};

export default ModalAlert;
