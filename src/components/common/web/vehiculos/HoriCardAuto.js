import React, { useContext } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useHistory } from "react-router";

//Context
import { AuthContext } from "../../../../contexts/AuthContext";

//Validaciones
import {
  validationDateWeb,
  validationString,
} from "../../../../utils/Validations";

const HorizontalCard = (props) => {
  const history = useHistory();
  const { typeUser, setIdVehiculo, infoAlqui, setInfoAlqui } =
    useContext(AuthContext);

  const validacionInfoAlqui = () => {
    if (
      validationString(infoAlqui.entrega.lugar) &&
      validationString(infoAlqui.entrega.fecha) &&
      validationString(infoAlqui.devolucion.lugar) &&
      validationString(infoAlqui.devolucion.fecha)
    ) {
      if (
        validationDateWeb(infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha)
      ) {
        history.push("/public/Detalle");
      }
    } else {
      console.log("Ingresa los valores necesarios");
    }
  };

  return (
    <Row className="p-2" key={props.i}>
      <Col xs={12} md={4}>
        <Image src={props.item.imagen} fluid />
      </Col>
      <Col xs={12} md={5}>
        <Col>
          <h2>{`${props.item.modelo.marca.marca} ${props.item.modelo.modelo}`}</h2>
        </Col>
        <h3>
          Placa:{" "}
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
          >
            {props.item.placa}
          </span>
        </h3>
        <h3>
          Año:{" "}
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
          >
            {props.item.anio}
          </span>
        </h3>
        <h3>
          Transmision:{" "}
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
          >
            {props.item.transmision}
          </span>
        </h3>
        <h3>
          Pasajeros:{" "}
          <span
            className="badge rounded-pill"
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
          >
            {props.item.pasajeros}
          </span>
        </h3>
      </Col>

      {typeUser === 0 || typeUser === 3 ? (
        <Col xs={12} md={3} className="d-grid gap-2 p-5">
          <h5>Precio por día: ${props.item.precio_dia}</h5>
          <Button
            onClick={() => {
              setIdVehiculo(props.item.id_auto_PK);
              setInfoAlqui({
                ...infoAlqui,
                precio_neto: props.item.precio_dia,
              });
              validacionInfoAlqui();
            }}
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
            variant="primary"
            size="lg"
            type="submit"
          >
            Continuar
          </Button>
        </Col>
      ) : (
        <Col xs={12} md={3} className="d-grid gap-2 p-5">
          <Button
            onClick={() => {
              props.handleShow();
              props.setIdAuto(props.item.id_auto_PK);
            }}
            style={{
              backgroundColor: "#F7B569",
              color: "#f9f9f9",
              borderColor: "#DEA35F",
            }}
            variant="primary"
            size="lg"
            type="submit"
          >
            Confirmar
          </Button>
          <Button
            onClick={() => {
              props.setIdAuto(props.item.id_auto_PK);
              props.setAlert(true);
            }}
            variant="danger"
            size="lg"
            type="submit"
          >
            Eliminar
          </Button>
        </Col>
      )}
    </Row>
  );
};

export default HorizontalCard;
