import React, { useState, useContext } from "react";
import "../../views/signup/Signup.css";
import FormAlquiler from "./alquileres/FormAlquiler";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
//FETCHAPI
import FetchAPI from "../../../utils/FetchAPI";

//URL API
import { urlUsuariosWeb } from "../../../consts/URLs";

//Validations
import {
  validationString,
  validationEmail,
  validationNumber,
} from "../../../utils/Validations";

const FormSignup = ({ registrar, setRegistrar }) => {
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

  //FUNCION PARA CREAR USUARIOS DESDE EL LOGIN
  const createUser = () => {
    if (validationString(datos.nombres)) {
      if (validationString(datos.apellidos)) {
        if (validationEmail(datos.email)) {
          if (validationString(datos.fecha_nacimiento)) {
            if (validationString(datos.direccion)) {
              if (validationNumber(datos.telefono)) {
                if (validationString(datos.usuario)) {
                  if (validationString(datos.password)) {
                    if (validationString(datos.password_confirm)) {
                      if (datos.password === datos.password_confirm) {
                        const userAPI = FetchAPI(urlUsuariosWeb, "POST", datos);

                        userAPI
                          .then((user) => {
                            if (user.id_usuario_PK) {
                              alert("Usuario creado");
                              setRegistrar(false);
                            } else {
                              alert(
                                "Ocurrio un problema al momento de crear el usuario"
                              );
                            }
                          })
                          .catch((err) => {
                            console.log(err);
                          });
                      } else {
                        alert("Las contraseñas no son iguales");
                      }
                    } else {
                      alert("Ingrese de nuevo su contraseña");
                    }
                  } else {
                    alert("Ingrese su contraseña");
                  }
                } else {
                  alert("Ingrese un usuario");
                }
              } else {
                alert("Ingrese su telefono");
              }
            } else {
              alert("Ingrese su direccion");
            }
          } else {
            alert("Ingrese su fecha de nacimiento");
          }
        } else {
          alert("Ingrese un correo valido");
        }
      } else {
        alert("Ingrese sus apellidos");
      }
    } else {
      alert("Ingrese sus nombres");
    }
  };

  return (
    <>
      <FormAlquiler datos={datos} setDatos={setDatos} />
      <Row>
        <Form.Group>
          <span style={{ color: "black" }} className="form-label">
            ¿Ya tienes una cuenta? Inicia sesión{" "}
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
            createUser();
          }}
        >
          Registrarse
        </Button>
      </Row>
    </>
  );
};

export default FormSignup;
