import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";

const ModalBorrar = (props) => {
  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Alert style={{marginBottom: 0}} variant="danger">
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>{props.message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => props.setAlert(false)}
            variant="outline-success"
          >
            Cancelar
          </Button>
          <Button onClick={() => props.action()} variant="outline-danger">
            Eliminar
          </Button>
        </div>
      </Alert>
    </Modal>
  );
};

export default ModalBorrar;
