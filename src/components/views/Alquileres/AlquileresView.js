import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import FetchAPI from "../../../utils/FetchAPI";
import { urlAlquileresWeb } from "../../../consts/URLs";
import { AuthContext } from "../../../contexts/AuthContext";
import ModalAlert from "../../common/web/AlertNormal";
import { validationDate } from "../../../utils/Validations";

const ClienteView = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const { typeUser, idVehiculo, infoAlqui, setInfoAlqui, idUser } =
    useContext(AuthContext);
  const [precioTotal, setPrecioTotal] = useState(0);
  const [dias, setDias] = useState(0);
  const [alquileres, setAlquileres] = useState([]);

  const getAlquileres = () => {
    let alquilerAPI = FetchAPI(urlAlquileresWeb, "GET", {});
    alquilerAPI.then((data) => {
      setAlquileres([...data]);
    });
  };

  const createAlquiler = () => {
    const data = {
      id_usuario: idUser,
      id_auto: idVehiculo,
      lugar_entrega: infoAlqui.entrega.lugar,
      fecha_entrega: infoAlqui.entrega.fecha,
      lugar_devolucion: infoAlqui.devolucion.lugar,
      fecha_devolucion: infoAlqui.devolucion.fecha,
      dias_alquiler: dias,
      precio_neto: infoAlqui.precio_neto,
      precio_total: precioTotal,
    };

    const alquilerAPI = FetchAPI(`${urlAlquileresWeb}`, "POST", data);

    alquilerAPI
      .then((alquiler) => {
        if (alquiler) {
          //alertMovil('Información', 'Alquiler creado');
        }
      })
      .catch((err) => {
        console.log("error: " + err);
      });
  };

  useEffect(() => {
    getAlquileres();
    console.log(alquileres);
  }, [show]);

  //FUNCION PARA CALCULAR LOS DIAS DE DIFERENCIA ENTRE LAS FECHAS
  const calcularDias = () => {
    if (validationDate(infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha)) {
      const fechaMin = infoAlqui.entrega.fecha.split("/");
      const fechaMax = infoAlqui.devolucion.fecha.split("/");

      const fechaIni = new Date(
        `${fechaMin[2]}/${fechaMin[1]}/${fechaMin[0]}`
      ).getTime();
      const fechaFin = new Date(
        `${fechaMax[2]}/${fechaMax[1]}/${fechaMax[0]}`
      ).getTime();

      const diff = fechaFin - fechaIni;

      setDias(diff / (1000 * 60 * 60 * 24));

      return diff / (1000 * 60 * 60 * 24);
    } else {
      setDias(0);
      return 0;
    }
  };

  useEffect(() => {
    setPrecioTotal(infoAlqui.precio_neto * calcularDias());
  }, [infoAlqui]);

  if (typeUser === 3) {
    return (
      <>
        <Container fluid> Hola mundo</Container>
      </>
    );
  } else {
    return (
      <>
        <Container fluid>Hola admin</Container>
      </>
    );
  }
};

export default ClienteView;
