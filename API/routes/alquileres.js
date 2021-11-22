const express = require('express');
const Alquiler = require('../models/alquileres');
const Usuario = require('../models/usuarios');
const Auto = require('../models/autos');
const Modelo = require('../models/modelos');
const Marca = require('../models/marcas');
const ruta = express.Router();

//PETICIONES HTTP

//PETICION GET
ruta.get('/', (req, res) => {
    let result = getAlquileres();

    result.then( alquileres => res.json(alquileres) )
        .catch( err => {
            res.status(400).json({
                mensaje: 'Ocurrio un problema al obtener los alquileres',
                err
            })
        })
});

//PETICION POST
ruta.post('/', (req, res) => {
    let { body } = req;
    let result = createAlquiler( body );

    result.then( alquiler => res.json(alquiler) )
        .catch( err => {
            res.status(400).json({
                mensaje: 'Ocurrio un problema al crear el alquiler',
                err
            })
        })
});

//PETICION PUT
ruta.put('/:id', (req, res) => {
    let { body } = req;
    let { id } = req.params;
    let result = updateAlquiler( id, body );

    result.then( alquiler => res.json(alquiler) )
        .catch( err => {
            res.status(400).json({
                mensaje: 'Ocurrio un problema al modificar el alquiler',
                err
            })
        })
});

//PETICION DELETE
ruta.delete('/:id', (req, res) => {
    let { id } = req.params;
    let result = deleteAlquiler( id );

    result.then( alquiler => res.json(alquiler) )
        .catch( err => {
            res.status(400).json({
                mensaje: 'Ocurrio un problema al eliminar el alquiler',
                err
            })
        })
});

//FUNCIONES PARA EL CRUD

//FUNCION PARA OBTENER LOS ALQUILERES
async function getAlquileres()
{
    return await Alquiler.findAll({
        where: {
            estado: 0
        },
        include: [
            {
                model: Usuario,
                as: 'usuario',
                attributes: ['nombres', 'apellidos', 'usuario', 'email']
            },
            {
                model: Auto,
                as: 'auto',
                attributes: ['placa', 'anio', 'imagen'],
                include: {
                    model: Modelo,
                    as: 'modelo',
                    attributes: ['modelo'],
                    include: {
                        model: Marca,
                        as: 'marca',
                        attributes: ['marca']
                    }
                }
            }
        ]
    })
}

//FUNCION PARA CREAR UN ALQUILER
async function createAlquiler( body )
{
    return await Alquiler.create({
        id_usuario_FK: body.id_usuario,
        id_auto_FK: body.id_auto,
        lugar_entrega: body.lugar_entrega,
        fecha_entrega: body.fecha_entrega,
        lugar_devolucion: body.lugar_devolucion,
        fecha_devolucion: body.fecha_devolucion,
        dias_alquiler: body.dias_alquiler,
        precio_neto: body.precio_neto,
        precio_total: body.precio_total
    })
}

//FUNCION PARA MODIFICAR UN ALQUILER
async function updateAlquiler( id, body )
{
    return await Alquiler.update({
        id_usuario_FK: body.id_usuario,
        id_auto_FK: body.id_auto,
        lugar_entrega: body.lugar_entrega,
        fecha_entrega: body.fecha_entrega,
        lugar_devolucion: body.lugar_devolucion,
        fecha_devolucion: body.fecha_devolucion,
        dias_alquiler: body.dias_alquiler,
        precio_neto: body.precio_neto,
        precio_total: body.precio_total
    },{
        where: {
            id_alquiler_PK: id
        }
    })
}

//fUNCION PARA ELIMINAR UN ALQUILER, CAMBIO DE ESTADO
async function deleteAlquiler( id )
{
    return await Alquiler.update({ estado: 1 }, {
        where: {
            id_alquiler_PK: id
        }
    })
}


module.exports = ruta;