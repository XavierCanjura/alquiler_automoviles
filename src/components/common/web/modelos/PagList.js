import React, { useState } from "react";
import { Pagination, Table, Button } from "react-bootstrap";

const PaginationList = (props) => {
  const perslice = 4;

  const noslices = Math.ceil(props.modelos.length / perslice);

  const [minimo, setMinimo] = useState(0);
  const [maximo, setMaximo] = useState(perslice);

  const MinMax = (key) => {
    if (key === 1) {
      setMinimo(0);
      setMaximo(perslice);
    } else {
      if (key * perslice > props.modelos.length) {
        setMaximo(props.modelos.length);
      } else {
        setMaximo(key * perslice);
      }
      setMinimo((key - 1) * perslice);
    }
  };

  const PaginaSelected = (key) => {
    MinMax(key);
  };

  let items = [];
  for (let number = 1; number <= noslices; number++) {
    items.push(
      <Pagination.Item
        key={number}
        onClick={() => {
          PaginaSelected(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr className="justify-content-center">
            <th>Modelo</th>
            <th>Marca</th>
            <th colSpan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.modelos.slice(minimo, maximo).map(function (item, i) {
            return (
              <>
                <tr key={i}>
                  <td>{item.modelo}</td>
                  <td>{item.marca.marca}</td>
                  <td className="d-grid gap-1">
                    {" "}
                    <Button
                      onClick={() => {
                        props.setModeloID(item.id_modelos_PK);
                        console.log("El id es: " + item.id_modelos_PK);
                        props.handleShow();
                      }}
                      style={{
                        backgroundColor: "#F7B569",
                        color: "#f9f9f9",
                        borderColor: "#DEA35F",
                      }}
                      variant="outline-light"
                      size="lg"
                      type="submit"
                    >
                      Editar
                    </Button>
                  </td>
                  <td className="d-grid gap-1">
                    {" "}
                    <Button
                      onClick={() => {
                        props.setModeloID(item.id_modelos_PK);
                        props.setAlert(true);
                      }}
                      variant="danger"
                      size="lg"
                      type="submit"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
      <Pagination size="lg" className="justify-content-end px-5">
        {items}
      </Pagination>
    </>
  );
};

export default PaginationList;
