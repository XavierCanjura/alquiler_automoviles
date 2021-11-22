import React from "react";
import { Row, Col, Form } from "react-bootstrap";

const FormAlquiler = ({ datos, setDatos }) => {
  return (
    <Row>
      <h3 className="mt-3">Información del cliente</h3>
      <Form>
        <Row>
          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Nombres</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus nombres"
                value={datos.nombres}
                onChange={(e) =>
                  setDatos({ ...datos, nombres: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese sus apellidos"
                value={datos.apellidos}
                onChange={(e) =>
                  setDatos({ ...datos, apellidos: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su correo electrónico"
                value={datos.email}
                onChange={(e) => setDatos({ ...datos, email: e.target.value })}
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Dirección de residencia</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su dirección"
                value={datos.direccion}
                onChange={(e) =>
                  setDatos({ ...datos, direccion: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Número de teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su número de teléfono"
                value={datos.telefono}
                onChange={(e) =>
                  setDatos({ ...datos, telefono: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su fecha de nacimiento"
                value={datos.fecha_nacimiento}
                onChange={(e) =>
                  setDatos({ ...datos, fecha_nacimiento: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su usuario"
                value={datos.usuario}
                onChange={(e) =>
                  setDatos({ ...datos, usuario: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese una contraseña"
                value={datos.password}
                onChange={(e) =>
                  setDatos({ ...datos, password: e.target.value })
                }
              />
            </Form.Group>
          </Col>

          <Col xs={12} lg={4}>
            <Form.Group className="mb-3">
              <Form.Label>confirmar contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese de nuevo su contraseña"
                value={datos.password_confirm}
                onChange={(e) =>
                  setDatos({ ...datos, password_confirm: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default FormAlquiler;
