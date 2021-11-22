import React, { useContext } from 'react';
import { Form, Col, Button, Row } from 'react-bootstrap';

//Context
import { AuthContext } from "../../../../contexts/AuthContext";

const FormFechaLugar = () => {

    const { infoAlqui, setInfoAlqui } = useContext( AuthContext );

    return (
        <Form>
            <Form.Group  as={Row} className="mb-3 justify-content-evenly p-4">
                <Col className="mb-2" xs={12} md={2}>
                    <Form.Control 
                        type="text" 
                        placeholder="Sucursal de Entrega"
                        value = { infoAlqui.entrega.lugar }
                        onChange = { (e) => { 
                                setInfoAlqui({ ...infoAlqui, entrega: { ...infoAlqui.entrega, lugar: e.target.value} }) 
                            } 
                        } 
                    />
                </Col>
                <Col className="mb-2" xs={12} md={3}>
                    <Form.Control 
                        type="date" 
                        placeholder="Fecha de Entrega"
                        value = { infoAlqui.entrega.fecha }
                        onChange = { (e) => { 
                                setInfoAlqui({ ...infoAlqui, entrega: { ...infoAlqui.entrega, fecha: e.target.value} });

                                console.log(e.target.value);
                            } 
                        }
                    />
                </Col>
                <Col className="mb-2" xs={12} md={2}>
                    <Form.Control 
                        type="text" 
                        placeholder="Sucursal de Devolución"
                        value = { infoAlqui.devolucion.lugar }
                        onChange = { (e) => { 
                                setInfoAlqui({ ...infoAlqui, devolucion: { ...infoAlqui.devolucion, lugar: e.target.value} }) 
                            } 
                        }
                    />
                </Col>
                <Col className="mb-2" xs={12} md={3}>
                    <Form.Control 
                        type="date" 
                        placeholder="Fecha de Devolución"
                        value = { infoAlqui.devolucion.fecha }
                        onChange = { (e) => { 
                                setInfoAlqui({ ...infoAlqui, devolucion: { ...infoAlqui.devolucion, fecha: e.target.value} }) 
                            } 
                        }
                    />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default FormFechaLugar;