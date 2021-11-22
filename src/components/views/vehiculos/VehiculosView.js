import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FetchAPI from "../../../utils/FetchAPI";
//Componentes de Vehiculos
import PaginationList from "../../common/web/vehiculos/PagList";
import ModalEdit from "../../common/web/vehiculos/ModalEdit";
import ModalBorrar from "../../common/web/vehiculos/ModalBorrar";
import FormFechaLugar from "../../common/web/alquileres/FormfechaLugar";

//URL API
import { urlAutosWeb } from "../../../consts/URLs";
//Context
import { AuthContext } from "../../../contexts/AuthContext";

const VehiculosView = () => {
  const { infoAlqui, setIdVehiculo, setInfoAlqui, typeUser } =
    useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseDel = () => setShow(false);

  const [autos, setAutos] = useState([]);
  const [idAuto, setIdAuto] = useState(0);
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!show) {
      console.log("Obteniendo a los autos");
      getAutos();
    }
  }, [show]);

  const getAutos = () => {
    let autosAPI = FetchAPI(urlAutosWeb, "GET", {});
    autosAPI.then((data) => {
      setAutos([...data]);
    });
  };

  //FUNCION PARA ELIMINAR VEHICULOS
  const deleteVehiculo = () => {
    const autoAPI = FetchAPI(`${urlAutosWeb}${idAuto}`, "DELETE", {});

    autoAPI
      .then((data) => {
        getAutos();
        setAlert(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const eliminarText = "Eliminar vehículo";
  const eliminarMes = "¿Desea eliminar el vehículo?";
  return (
    <>
      <ModalEdit show={show} idAuto={idAuto} handleClose={handleCloseDel} />
      <ModalBorrar
        show={alert}
        title={eliminarText}
        message={eliminarMes}
        setAlert={setAlert}
        action={deleteVehiculo}
      />
      <Container fluid>
        <Row>
          <Col className="text-center text-uppercase fs-2 p-5" xs={12}>
            <h1 style={{ color: "#F7B569" }}>Vehiculos</h1>
          </Col>
        </Row>

        {typeUser === 0 || typeUser === 3 ? (
          <>
            <FormFechaLugar />
            <hr class="mt-3 mb-3" />
          </>
        ) : (
          <Row className="text-end mb-5">
            <Col className="px-5" xs={12}>
              <Button
                onClick={() => {
                  setIdAuto(0);
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
                Agregar Auto
              </Button>
            </Col>
          </Row>
        )}
        <PaginationList
          autos={autos}
          setIdAuto={setIdAuto}
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
    </>
  );
};

export default VehiculosView;
