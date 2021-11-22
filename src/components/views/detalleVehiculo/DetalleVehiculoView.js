import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import './style.css'

import FormAlquiler from '../../common/web/alquileres/FormAlquiler';

//Context
import { AuthContext } from '../../../contexts/AuthContext';

//Validaciones
import { validationDateWeb } from '../../../utils/Validations';

//FetchAPI
import FetchAPI from '../../../utils/FetchAPI';

//URL's API
import { urlAutosWeb, urlAlquileresWeb } from '../../../consts/URLs';
import { useHistory } from 'react-router';

const DetalleVehiculoView = () => {
    const history = useHistory();

    const { typeUser, idVehiculo, infoAlqui, setInfoAlqui, idUser } = useContext(AuthContext);
    const [ dias, setDias ] = useState(0);
    const [ precioTotal, setPrecioTotal ] = useState(0);
    const [ dataAuto, setDataAuto ] = useState({
        ac: "",
        anio: 0,
        estado: 0,
        estado_auto: {id_estado_auto_PK: 0, estado_auto: ''},
        id_auto_PK: 0,
        id_estado_auto_FK: 0,
        imagen: "",
        modelo: {id_modelos_PK: 0, modelo: '', marca: {id_marca_PK: 0, marca: ""} },
        motor: "",
        pasajeros: 0,
        placa: "",
        precio_dia: "",
        puertas: 0,
        transmision: "",
        vidrios_electricos: ""
    })

    useEffect( () => {
        if(idVehiculo !== 0)
        {
            const autoAPI = FetchAPI(`${ urlAutosWeb }${idVehiculo}`, 'GET', {});

            autoAPI.then( auto => {
                var info = auto[0];
                setDataAuto({ ...info });
                calcularDias();
            })
            .catch(err => {
                console.log(err);
            })
            
        }
        else
        {
            history.push('/public/Autos');
        }
    }, [infoAlqui])

    useEffect( () => {
        setPrecioTotal( Number(infoAlqui.precio_neto) * dias );
    }, [dias])

    //FUNCION PARA CALCULAR LOS DIAS DE DIFERENCIA ENTRE LAS FECHAS
    const calcularDias = () => {
        if(validationDateWeb( infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha ))
        {
            const fechaMin = infoAlqui.entrega.fecha
            const fechaMax = infoAlqui.devolucion.fecha

            const fechaIni = new Date(fechaMin).getTime();
            const fechaFin = new Date(fechaMax).getTime();

            const diff = fechaFin - fechaIni;

            setDias(diff/(1000*60*60*24));
            return diff/(1000*60*60*24)
        }
        else
        {
            setDias(0);
            return 0
        }
    }

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
            precio_total: precioTotal 
        }

        const alquilerAPI = FetchAPI(`${urlAlquileresWeb}`, 'POST', data);

        alquilerAPI.then( alquiler => {
            if(alquiler)
            {
                alert('Alquiler creado');
            }
        })
        .catch( err => {
            console.log('error: '+err);
        })

    }

    return(
        <Container fluid='lg' >
            <h1 className = 'title'>Detalle de Alquiler</h1>
            <Row className = 'card'>
                <Col xs={12} sm={12} md={8}>
                    <Row>
                        <Col xs = {12} className='mt-3'>
                            <h3>Alquiler de { dataAuto.modelo.marca.marca } { dataAuto.modelo.modelo } por { dias } días</h3>
                        </Col>
                        <Col xs = {6} className='mt-4'>
                            <p>Entrega de vehículo:</p>
                            <p>{ infoAlqui.entrega.lugar }</p>
                            <p>{ infoAlqui.entrega.fecha }</p>
                        </Col>
                        <Col xs = {6} className='mt-4'>
                            <p>Devolución de vehículo</p>
                            <p>{ infoAlqui.devolucion.lugar }</p>
                            <p>{ infoAlqui.devolucion.fecha }</p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={12} sm={12} md={4}>
                    <img className = 'image' src = { dataAuto.imagen } />
                </Col>
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Dia/s</th>
                            <th>Precio por día</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='align-rigth'>{ dataAuto.modelo.marca.marca } { dataAuto.modelo.modelo }</td>
                            <td className='text-center'>{ dias }</td>
                            <td className='text-center'>${ infoAlqui.precio_neto }</td>
                            <td className='text-center'>${ precioTotal }</td>
                        </tr>
                        <tr>
                            <td className='align-rigth'>Total</td>
                            <td></td>
                            <td></td>
                            <td className='text-center'>${ precioTotal }</td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
            { idUser !== 0 ? (null) : (
                null
            ) }
            <div className = 'action mt-3 flex-end'>
                <Button onClick = { () => createAlquiler() } >Confirmar Alquiler</Button>
                <Button onClick = { () => history.push('/public/Autos') } >Regresar</Button>
            </div>
        </Container>
    )
}

export default DetalleVehiculoView;