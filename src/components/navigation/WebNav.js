import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

//Context
import { AuthContext } from "../../contexts/AuthContext";

export const WebNavPublic = ({ children, typeUser }) => {
  const { setIdUser, changeAuth, setTypeUser } = useContext(AuthContext);

  const logout = () => {
    changeAuth();
    setIdUser(0);
    setTypeUser(0);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#1E2430" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand to="/">
            <img
              alt=""
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React-Cars
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            {typeUser !== 3 ? (
              <Nav>
                <NavLink
                  to="/public/Home"
                  className="nav-link"
                  activeClassName=" nav-link active"
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/public/Autos"
                  className="nav-link"
                  activeClassName="nav-link active"
                >
                  Autos
                </NavLink>
                <NavLink
                  to="/public/Signup"
                  className="nav-link"
                  activeClassName="nav-link active"
                >
                  Iniciar Sesion
                </NavLink>
              </Nav>
            ) : (
              <Nav>
                <NavLink
                  to="/public/Home"
                  className="nav-link"
                  activeClassName=" nav-link active"
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/public/Autos"
                  className="nav-link"
                  activeClassName="nav-link active"
                >
                  Autos
                </NavLink>
                <NavDropdown title="Usuario">
                  <NavDropdown.Item>
                    <NavLink
                      style={{ color: "black" }}
                      to="/public/Perfil"
                      className="nav-link"
                      activeClassName="nav-link active"
                    >
                      Mi Perfil
                    </NavLink>
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>
                    <NavLink
                      style={{ color: "black" }}
                      to="/public/Signup"
                      className="nav-link"
                      activeClassName="nav-link active"
                      onClick={() => logout()}
                    >
                      Salir
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};

export const WebNavPriv = ({ children }) => {
  const { setIdUser, changeAuth, setTypeUser } = useContext(AuthContext);

  const logout = () => {
    changeAuth();
    setIdUser(0);
    setTypeUser(0);
  };
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#1E2430" }}
        variant="dark"
      >
        <Container>
          <Navbar.Brand to="/">
            <img
              alt=""
              src="https://react-bootstrap.github.io/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            React-Cars
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            className="justify-content-end"
            id="responsive-navbar-nav"
          >
            <Nav>
              <NavLink
                to="/dash/home"
                className="nav-link"
                activeClassName=" nav-link active"
              >
                Inicio
              </NavLink>
              <NavLink
                to="/dash/vehiculos"
                className="nav-link"
                activeClassName=" nav-link active"
              >
                Autos
              </NavLink>
              <NavDropdown title="Configuración">
                <NavDropdown.Item>
                  <NavLink
                    style={{ color: "black" }}
                    to="/dash/marcas"
                    className="nav-link"
                    activeClassName="nav-link active"
                  >
                    Marcas
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink
                    style={{ color: "black" }}
                    to="/dash/modelos"
                    className="nav-link"
                    activeClassName="nav-link active"
                  >
                    Modelos
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <NavLink
                    style={{ color: "black" }}
                    to="/dash/clientes"
                    className="nav-link"
                    activeClassName="nav-link active"
                  >
                    Clientes
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
              <NavLink
                to="/dash/alquileres"
                className="nav-link"
                activeClassName=" nav-link active"
              >
                Alquileres
              </NavLink>
              <NavDropdown title="Usuario">
                <NavDropdown.Item>
                  <NavLink
                    style={{ color: "black" }}
                    to="/dash/perfil"
                    className="nav-link"
                    activeClassName="nav-link active"
                  >
                    Mi Perfil
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <NavLink
                    style={{ color: "black" }}
                    to="/public/Signup"
                    className="nav-link"
                    activeClassName="nav-link active"
                    onClick={() => logout()}
                  >
                    Salir
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {children}
    </>
  );
};
