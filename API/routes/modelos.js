const express = require('express');
const Marca = require('../models/marcas');
const Modelo = require('../models/modelos');
const ruta = express.Router();

//PETICIONES HTTP

//PETICION GET (TODOS LOS MODELOS)
ruta.get('/', (req, res) => {
    let result = getModelos();

    result.then( modelos => {
        res.json({ modelos });
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'No se encontraron modelos de vehiculos',
            err
        })
    })
})

//PETICION GET (MODELOS DE UNA MARCA)
ruta.get('/:id', (req, res) => {
    let id_marca = req.params.id;

    let result = getModelosMarca( id_marca );
    result.then( modelos => {
        res.json({ modelos })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al momento de obtener las marcas',
            err
        })
    })
})

//PETICION GET (MODELOS POR ID)
ruta.get('//:id', (req, res) => {
    let id_marca = req.params.id;

    let result = getModelosID( id_marca );
    result.then( modelos => {
        res.json({ modelos })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al momento de obtener las marcas',
            err
        })
    })
})

//PETICION POST
ruta.post('/', (req, res) => {
    let body = req.body;

    let result = createModelo( body );
    result.then( modelo => {
        res.json({ modelo })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al crear el modelo',
            err
        })
    })
})


//PETICION PUT
ruta.put('/:id', (req, res) => {
    let body = req.body;
    let id = req.params.id

    let result = updateModelo( id, body );
    
    result.then( modelo => {
        res.json({ modelo })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al modificar el modelo',
            err
        })
    })
})

//PETICION DELETE
ruta.delete('/:id', (req, res) => {
    let id = req.params.id;

    let result = deleteModelo( id );
    result.then( modelo => {
        res.json({ modelo })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al eliminar el modelo',
            err
        })
    })
})

//FUNCIONES PARA EL CRUD

//FUNCION PARA OBTENER LOS MODELOS
async function getModelos()
{
    return await Modelo.findAll({
        where: {
            estado: 0
        },
        include: {
            model: Marca,
            as: 'marca',
            attributes: ['id_marca_PK', 'marca']
        }
    })
}

//FUNCION PARA OBTENER LOS MODELOS RESPECTO A UNA MARCA
async function getModelosMarca( id_marca )
{
    return await Modelo.findAll({
        where: {
            id_marca_FK: id_marca,
            estado: 0
        }
    })
}


//FUNCION PARA OBTENER LOS MODELOS POR ID
async function getModelosID( id_marca )
{
    return await Modelo.findAll({
        where: {
            id_modelos_PK: id_marca,
            estado: 0
        }
    })
}


//FUNCION PARA CREAR MODELO DE VEHICULOS
async function createModelo(body)
{
    return await Modelo.create({ 
        id_marca_FK: body.id_marca,
        modelo: body.modelo
    });
}

//FUNCION PARA MODIFICAR LOS MODELOS
async function updateModelo( id, body )
{
    return await Modelo.update({ 
        id_marca_FK :   body.id_marca,
        modelo      :   body.modelo 
    }, {
        where: {
            id_modelos_PK: id
        }
    })
}

//FUNCION PARA ELIMINAR EL MODELO, SOLO CAMBIA EL ESTADO
async function deleteModelo( id )
{
    return await Modelo.update({ estado: 1}, {
        where: {
            id_modelos_PK: id
        }
    })
}


module.exports = ruta;