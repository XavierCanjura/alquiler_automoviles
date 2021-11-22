import React, { useEffect, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
/*Llamando APIS y sus URLS */
import FetchAPI from "../../../../utils/FetchAPI";
import {
  urlAutosWeb,
  urlMarcasWeb,
  urlModelosWeb,
} from "../../../../consts/URLs";

const ModalEdit = (props) => {
  const [data, setData] = useState({
    id_modelo: "",
    anio: "",
    placa: "",
    precio_dia: "",
    transmision: "",
    pasajeros: "",
    puertas: "",
    ac: "",
    motor: "",
    vidrios_electricos: "",
    imagen: "",
    id_estado_auto: 1,
  });

  const [marca, setMarca] = useState(0);

  /*Datos de tablas externas */
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  useEffect(() => {
    console.log("Cargando marcas...");
    let marcasAPI = FetchAPI(urlMarcasWeb, "GET", {});
    marcasAPI.then((data) => {
      setMarcas([...data.marcas]);
    });
  }, [props.show]);

  //PARA OBTENER MODELOS
  useEffect(() => {
    if (marca != 0) {
      console.log("Cargando modelos...");
      let ModelosAPi = FetchAPI(`${urlModelosWeb}/${marca}`, "GET", {});
      ModelosAPi.then((data) => {
        //SE GUARDAN LOS MODELOS
        setModelos([...data.modelos]);
      });
    }
  }, [marca]);

  //FUNCION PARA CREAR LOS AUTOS
  const createVehiculo = () => {
    let vehiculoNew = FetchAPI(urlAutosWeb, "POST", data);
    vehiculoNew
      .then((data) => {
        if (data.id_auto_PK !== 0) {
          console.log("el vehiculo se creo");
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //FUNCION PARA MODIFICAR LOS AUTOS
  const updateVehiculo = () => {
    const autoAPI = FetchAPI(`${urlAutosWeb}${data.id_auto}`, "PUT", data);

    autoAPI
      .then((data) => {
        console.log(data);
        reset();
        props.handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (props.idAuto > 0) {
      //FUNCION PARA OBTENER LA INFORMACION DEL AUTO SEGUN SU ID
      let autoAPI = FetchAPI(`${urlAutosWeb}${props.idAuto}`, "GET", {});
      autoAPI.then((data) => {
        const {
          id_auto_PK,
          anio,
          placa,
          precio_dia,
          transmision,
          pasajeros,
          puertas,
          ac,
          motor,
          vidrios_electricos,
          imagen,
          modelo,
        } = data[0];
        setMarca(modelo.marca.id_marca_PK);
        setData({
          ...data,
          id_auto: id_auto_PK,
          id_modelo: modelo.id_modelos_PK,
          anio: anio.toString(),
          placa,
          precio_dia,
          transmision,
          pasajeros: pasajeros.toString(),
          puertas: puertas.toString(),
          ac,
          motor,
          vidrios_electricos,
          imagen,
        });
      });
    } else {
      reset();
    }
  }, [props.idAuto, props.handleClose]);

  //FUNCION PARA RESETEAR LOS CAMPOS
  const reset = () => {
    setData({
      id_modelo: "",
      anio: "",
      placa: "",
      precio_dia: "",
      transmision: "",
      pasajeros: "",
      puertas: "",
      ac: "",
      motor: "",
      vidrios_electricos: "",
      imagen: "",
      id_estado_auto: 1,
    });
    setMarcas([]);
    setMarca("");
    setModelos([]);
  };

  //Controlador de Edicion/Agregar
  const Desicion = () => {
    if (props.idAuto === 0) {
      createVehiculo();
    } else {
      updateVehiculo();
    }
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header>
        <Modal.Title>Agregar y Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form>
            <Form.Group>
              <Form.Label>Marca</Form.Label>
              <Form.Control
                onChange={(item) => setMarca(item.target.value)}
                as="select"
              >
                <option>Seleccione una marca</option>
                {marcas.map((item, i) => (
                  <option key={i} value={item.id_marca_PK}>
                    {item.marca}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                onChange={(item) =>
                  setData({ ...data, id_modelo: item.target.value })
                }
                as="select"
              >
                <option>Seleccione un Modelo</option>
                {modelos.map((item, i) => (
                  <option key={i} value={item.id_modelos_PK}>
                    {item.modelo}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>Año</Form.Label>
              <Form.Control
                placeholder={data.anio}
                onChange={(text) =>
                  setData({ ...data, anio: text.target.value })
                }
                type="number"
              />
              <Form.Label>Placa</Form.Label>
              <Form.Control
                placeholder={data.placa}
                onChange={(text) =>
                  setData({ ...data, placa: text.target.value })
                }
              />
              <Form.Label>Transmisión</Form.Label>
              <Form.Control
                onChange={(text) =>
                  setData({ ...data, transmision: text.target.value })
                }
                as="select"
              >
                <option>Seleccione el tipo de caja</option>
                <option value="Automática">Automática</option>
                <option value="Manual">Manual</option>
              </Form.Control>
              <Form.Label>Pasajeros</Form.Label>
              <Form.Control
                placeholder={data.pasajeros}
                onChange={(text) =>
                  setData({ ...data, pasajeros: text.target.value })
                }
                type="number"
              />
              <Form.Label>Puertas</Form.Label>
              <Form.Control
                placeholder={data.puertas}
                onChange={(text) =>
                  setData({ ...data, puertas: text.target.value })
                }
                type="number"
              />
              <Form.Label>Motor</Form.Label>
              <Form.Control
                placeholder={data.motor}
                onChange={(text) =>
                  setData({ ...data, motor: text.target.value })
                }
                type="number"
              />
              <Form.Label>A/C</Form.Label>
              <Form.Control
                onChange={(text) => setData({ ...data, ac: text.target.value })}
                as="select"
              >
                <option>Seleccione el tipo de caja</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Form.Control>
              <Form.Label>Vidrios Eléctricos</Form.Label>
              <Form.Control
                onChange={(text) =>
                  setData({ ...data, vidrios_electricos: text.target.value })
                }
                as="select"
              >
                <option>Seleccione el tipo de caja</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
              </Form.Control>
              <Form.Label>Precio/Dia</Form.Label>
              <Form.Control
                placeholder={data.precio_dia}
                onChange={(text) =>
                  setData({ ...data, precio_dia: text.target.value })
                }
                type="number"
              />
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                placeholder={data.imagen}
                onChange={(text) =>
                  setData({ ...data, imagen: text.target.value })
                }
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={(props.handleClose, Desicion)}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdit;
