const express = require('express');
const Modelo = require('../models/modelos');
const Marca = require('../models/marcas');
const EstadoAuto = require('../models/estados_auto');
const Auto = require('../models/autos');
const ruta = express.Router();

//PETICIONES HTTP

//PETICION GET
ruta.get('/', (req, res) => {
    let result = getAutos();

    result.then( autos => {
        res.json( autos )
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema para obtener los autos',
            err
        })
    })
})

ruta.get('/:id', (req, res) => {
    let { id } = req.params
    let result = getAuto( id );

    result.then( auto => {
        res.json( auto )
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema para obtener el auto',
            err
        })
    })
})

//PETICION POST
ruta.post('/', (req, res) => {
    let { body } = req;
    let result = createAuto( body );

    result.then( auto => {
        res.json( auto )
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al crear el auto',
            err
        })
    })
})

//PETICION PUT
ruta.put('/:id', (req, res) => {
    let { body } = req;
    let { id } = req.params;
    let result = updateAuto( id, body );

    result.then( auto => {
        res.json( auto )
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al modificar el auto',
            err
        })
    })
})

//PETICION DELETE
ruta.delete('/:id', (req, res) => {
    let { id } = req.params;
    let result = deleteAuto( id );

    result.then( auto => {
        res.json( auto )
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al eliminar el auto',
            err
        })
    })
})


//FUNCIONES PARA EL CRUD

//FUNCION PARA OBTENER LOS AUTOS
async function getAutos()
{
    return await Auto.findAll({
        where: {
            estado: 0
        },
        order: [
            ['id_estado_auto_FK', 'ASC']
        ],
        include: [
            {
                model: Modelo,
                as: 'modelo',
                attributes: ['id_modelos_PK','modelo'],
                include: {
                    model: Marca,
                    as: 'marca',
                    attributes: ['id_marca_PK', 'marca']
                }
            },
            {
                model: EstadoAuto,
                as: 'estado_auto'
            }
        ],
        attributes: {
            exclude: ['id_modelo_FK']
        }
    })
}

//FUNCION PARA OBTENER A UN AUTO
async function getAuto( id )
{
    return await Auto.findAll({
        where: {
            id_auto_PK: id
        },
        include: [
            {
                model: Modelo,
                as: 'modelo',
                attributes: ['id_modelos_PK','modelo'],
                include: {
                    model: Marca,
                    as: 'marca',
                    attributes: ['id_marca_PK', 'marca']
                }
            },
            {
                model: EstadoAuto,
                as: 'estado_auto'
            }
        ],
        attributes: {
            exclude: ['id_modelo_FK']
        }
    })
}

//FUNCION PARA CREAR UN AUTO
async function createAuto( body )
{
    return await Auto.create({
        id_modelo_FK: body.id_modelo,
        anio: body.anio,
        placa: body.placa,
        precio_dia: body.precio_dia,
        transmision: body.transmision,
        pasajeros: body.pasajeros,
        puertas: body.puertas,
        ac: body.ac,
        motor: body.motor,
        vidrios_electricos: body.vidrios_electricos,
        imagen: body.imagen,
        id_estado_auto_FK: body.id_estado_auto
    })
}

//FUNCION PARA MODIFICAR UN AUTO
async function updateAuto( id, body )
{
    return await Auto.update({
        id_modelo_FK: body.id_modelo,
        anio: body.anio,
        placa: body.placa,
        precio_dia: body.precio_dia,
        transmision: body.transmision,
        pasajeros: body.pasajeros,
        puertas: body.puertas,
        ac: body.ac,
        motor: body.motor,
        vidrios_electricos: body.vidrios_electricos,
        imagen: body.imagen,
        id_estado_auto_FK: body.id_estado_auto
    },
    {
        where: {
            id_auto_PK: id
        }
    }
    )
}

//FUNCION PARA MODIFICAR EL ESTADO DEL AUTO (DISPONIBLE O ALQUILADO)
async function changeEstadoAuto( id, body )
{
    return await Auto.update({
            id_estado_auto_FK: body.id_estado_auto
        },
        {
            where: {
                id_auto_PK: id
            }
        }
    )
}

//FUNCION PARA ELIMINAR UN AUTO, SOLO SE CAMBIA DE ESTADO
async function deleteAuto( id )
{
    return await Auto.update({
            estado: 1
        },
        {
            where: {
                id_auto_PK: id
            }
        }
    )
}

module.exports = ruta;