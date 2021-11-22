import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FetchAPI from "../../../utils/FetchAPI";
import { urlMarcasWeb, urlModelosWeb } from "../../../consts/URLs";
import PaginationList from "../../common/web/modelos/PagList";
import ModalModelos from "../../common/web/modelos/ModalOS";
import ModalBorrar from "../../common/web/vehiculos/ModalBorrar";

const ModelosView = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modelo, setModelo] = useState({});
  const [modeloid, setModeloID] = useState(0);
  const [modelos, setModelos] = useState([]);
  const [alert, setAlert] = useState(false);

  const getModelos = () => {
    console.log("Cargando Modelos...");
    let modelosAPI = FetchAPI(urlModelosWeb, "GET", {});
    modelosAPI.then((data) => {
      console.log([...data.modelos]);
      setModelos([...data.modelos]);
    });
  };

  const deleteModelos = () => {
    const modelosAPI = FetchAPI(`${urlModelosWeb}${modeloid}`, "DELETE", {});
    modelosAPI
      .then((data) => {
        getModelos();
        setAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getModelos();
  }, [show]);

  return (
    <Container fluid>
      <ModalBorrar
        show={alert}
        title={"Eliminar Modelo"}
        message={"¿Quieres eliminar este modelo?"}
        setAlert={setAlert}
        action={deleteModelos}
      />
      <ModalModelos
        show={show}
        modelos={modelos}
        handleClose={handleClose}
        modeloid={modeloid}
        setModeloID={setModeloID}
      />
      <Row>
        <Col className="text-center text-uppercase fs-2 p-5" xs={12}>
          <h1 style={{ color: "#F7B569" }}>Modelos</h1>
        </Col>
      </Row>
      <Row className="text-end mb-5">
        <Col className="px-5" xs={12}>
          <Button
            onClick={() => {
              setModeloID(0);
              handleShow();
            }}
            style={{
              backgroundColor: "#1E2430",
              color: "#f9f9f9",
              borderColor: "#202633",
            }}
            size="lg"
            variant="primary"
          >
            Agregar Modelo
          </Button>
        </Col>
      </Row>
      <PaginationList
        setModeloID={setModeloID}
        modelos={modelos}
        handleShow={handleShow}
        setAlert={setAlert}
      />
      <Row
        className="mt-5"
        style={{ backgroundColor: "#1E2430", color: "#f9f9f9" }}
      >
        <Col xs={12} className="text-center text-uppercase fs-2 p-5">
          Derechos Reservados
        </Col>
      </Row>
    </Container>
  );
};

export default ModelosView;
