import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import { Container, Form, Button, Col, Row } from "react-bootstrap";

//CONTEXT
import { AuthContext } from "../../../contexts/AuthContext";

//VALIDATION
import { validationString } from "../../../utils/Validations";

//FETCHAPI
import FetchAPI from "../../../utils/FetchAPI";

//URL API
import { urlAuthWeb } from "../../../consts/URLs";
import e from "cors";

function LoginForm({ registrar, setRegistrar }) {
  const history = useHistory();
  const { setIdUser, changeAuth, setTypeUser } = useContext(AuthContext);

  const [datos, setDatos] = useState({
    id_tipo_usuario: 3,
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

  const LoginAPi = () => {
    const authAPI = FetchAPI(urlAuthWeb, "POST", datos);

    authAPI
      .then((user) => {
        if (user.message) {
          alert(user.message);
        } else {
          setIdUser(user.usuario.id);
          setTypeUser(user.usuario.tipo_usuario);
          changeAuth();
          history.push("/public/Home");
        }
      })
      .catch((err) => {
        console.log("error:" + err);
      });
  };

  //FUNCION PARA INICIAR SESION EN EL LOGIN
  const loginUser = () => {
    if (validationString(datos.usuario)) {
      if (validationString(datos.password)) {
        LoginAPi();
      } else {
        alert("Ingrese su contraseña");
      }
    } else {
      alert("Ingrese su usuario");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col className="text-center text-uppercase fs-2 p-5" xs={12}>
            <h1 style={{ color: "#F7B569" }}>Inicio de Sesión</h1>
          </Col>
        </Row>
        <Form>
          <Form.Group>
            <Form.Label>Usuario: </Form.Label>
            <Form.Control
              placeholder="Usuario"
              onChange={(e) => {
                setDatos({ ...datos, usuario: e.target.value });
              }}
            />
            <Form.Label>Contraseña: </Form.Label>
            <Form.Control
              placeholder="Contraseña"
              type="password"
              onChange={(e) => {
                setDatos({ ...datos, password: e.target.value });
              }}
            />
            <span style={{ color: "black" }} className="form-label">
              ¿Aún no tienes cuenta? Registrate{" "}
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  setRegistrar(!registrar);
                }}
              >
                aquí
              </a>
            </span>
          </Form.Group>
          <Row className="p-2">
            <Button
              variant="primary"
              style={{
                backgroundColor: "#1E2430",
                color: "#f9f9f9",
                borderColor: "#202633",
              }}
              size="lg"
              onClick={(e) => {
                e.preventDefault();
                loginUser();
              }}
            >
              Ingresar
            </Button>
          </Row>
        </Form>
      </Container>
    </>
  );
}

export default LoginForm;
