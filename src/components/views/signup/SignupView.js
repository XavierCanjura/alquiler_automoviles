import React, { useState, useContext } from "react";
import LoginForm from "../../common/web/LoginForm";
import FormSignup from "../../common/web/FormSignup";
import { Container, Row, Col, Button, Image } from "react-bootstrap";

//CONTEXT
import { AuthContext } from "../../../contexts/AuthContext";

const SignupView = () => {
  const [registrar, setRegistrar] = useState(false);
  return (
    <>
      <Container style={{ backgroundColor: "#f7b569" }} fluid>
        <Row style={{ backgroundColor: "#f7b569" }} className="rounded-5 p-5">
          <Col
            xs={12}
            md={6}
            style={{ backgroundColor: "#1E2430", color: "#f9f9f9" }}
          >
            <Row className="p-5">
              <Image
                fluid
                className="p-5"
                src="https://react-bootstrap.github.io/logo.svg"
              />
            </Row>
            <Row className="text-center text-uppercase fs-2 p-5">
              <h1>React-Cars</h1>
            </Row>
          </Col>
          <Col
            xs={12}
            md={6}
            className="p-5"
            style={{ backgroundColor: "white" }}
          >
            {registrar ? (
              <FormSignup setRegistrar={setRegistrar} registrar={registrar} />
            ) : (
              <LoginForm setRegistrar={setRegistrar} registrar={registrar} />
            )}
          </Col>
        </Row>
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

export default SignupView;
