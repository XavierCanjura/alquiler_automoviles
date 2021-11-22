import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";
import "./style.css";

//URL API
import { urlUsuariosWeb } from "../../../consts/URLs";
//CONTEXT
import { AuthContext } from "../../../contexts/AuthContext";
//FECTH_API
import FetchAPI from "../../../utils/FetchAPI";

import ModalAlert from "../../common/web/AlertNormal";

const ProfileView = () => {
  const handleClose = () => setShow(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [type, setType] = useState("info");
  const { idUser } = useContext(AuthContext);
  const [infoUser, setInfoUser] = useState({
    id_tipo_usuario: 0,
    nombres: "",
    apellidos: "",
    email: "",
    usuario: "",
    password: "",
    password_confirm: "",
    fecha_nacimiento: "",
    direccion: "",
    telefono: "",
  });

  useEffect(() => {
    getUser();
  }, []);

  const updateUser = () => {
    const userAPI = FetchAPI(`${urlUsuariosWeb}${idUser}`, "PUT", infoUser);

    userAPI
      .then((user) => {
        setTitle("Informacion");
        setMessage("Datos Modificados");
        setType("info");
        setAlert(true);
      })
      .catch((err) => {
        console.log("error: " + err);
      });

    if (
      infoUser.password_actual !== "" ||
      infoUser.password_new !== "" ||
      infoUser.password_confirm !== ""
    ) {
      if (validationPasswords()) {
        const userAPI = FetchAPI(
          `${urlUsuariosWeb}perfil/${idUser}`,
          "PUT",
          infoUser
        );

        userAPI
          .then((user) => {
            if (user.mensaje) {
              setTitle("Advertencia");
              setMessage(user.mensaje);
              setType("warning");
              setAlert(true);
            } else {
              setTitle("Información");
              setMessage("Contraseña modificada");
              setType("info");
              setAlert(true);
            }
          })
          .catch((err) => {
            console.log("error: " + err);
          });
      }
    }
  };

  const validationPasswords = () => {
    if (infoUser.password_new === infoUser.password_confirm) {
      return true;
    } else {
      return false;
    }
  };

  //FUNCION PARA OBTENER LOS DATOS DEL USUARIO LOGGEADO
  const getUser = () => {
    const userAPI = FetchAPI(`${urlUsuariosWeb}${idUser}`, "GET");

    userAPI
      .then((user) => {
        setInfoUser({
          ...infoUser,
          id_tipo_usuario: user[0].id_tipo_usuario_FK,
          nombres: user[0].nombres,
          apellidos: user[0].apellidos,
          email: user[0].email,
          usuario: user[0].usuario,
          password: user[0].password,
          password_actual: "",
          password_new: "",
          password_confirm: "",
          fecha_nacimiento: user[0].fecha_nacimiento,
          direccion: user[0].direccion,
          telefono: String(user[0].telefono),
        });
      })
      .catch((err) => {
        console.log("err: " + err);
      });
  };
  return (
    <Container>
      <ModalAlert
        type={type}
        show={alert}
        handleClose={handleClose}
        title={title}
        message={message}
        setAlert={setAlert}
      />
      ;<h1>Mi perfil</h1>
      <Row>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  value={infoUser.nombres}
                  onChange={(text) => {
                    setInfoUser({ ...infoUser, nombres: text.target.value });
                  }}
                  type="text"
                  placeholder="Ingrese sus nombres"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  value={infoUser.apellidos}
                  onChange={(text) =>
                    setInfoUser({ ...infoUser, apellidos: text.target.value })
                  }
                  type="text"
                  placeholder="Ingrese sus apellidos"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  value={infoUser.email}
                  onChange={(text) =>
                    setInfoUser({ ...infoUser, email: text.target.value })
                  }
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  value={infoUser.usuario}
                  onChange={(text) =>
                    setInfoUser({ ...infoUser, usuario: text.target.value })
                  }
                  type="text"
                  placeholder="Ingrese su usuario"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de nacimiento</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su fecha de nacimiento"
                  value={infoUser.fecha_nacimiento}
                  onChange={(text) =>
                    setInfoUser({
                      ...infoUser,
                      fecha_nacimiento: text.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Row>
      <h1>Cambiar contraseña</h1>
      <Row>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña actual</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su contraseña actual"
                  value={infoUser.password_actual}
                  onChange={(text) =>
                    setInfoUser({
                      ...infoUser,
                      password_actual: text.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña nueva</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese su nueva contraseña"
                  value={infoUser.password_new}
                  onChange={(text) =>
                    setInfoUser({
                      ...infoUser,
                      password_new: text.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirmar contraseña nueva</Form.Label>
                <Form.Control
                  value={infoUser.password_confirm}
                  type="password"
                  placeholder="Confirme su nueva contraseña"
                  onChange={(text) =>
                    setInfoUser({
                      ...infoUser,
                      password_confirm: text.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Row>
      <div className="containerButton">
        <Button
          onClick={() => {
            updateUser();
          }}
        >
          Guardar Cambios
        </Button>
      </div>
    </Container>
  );
};

export default ProfileView;
