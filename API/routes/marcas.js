const express = require('express');
const Marca = require('../models/marcas');
const ruta = express.Router();

//PETICIONES HTTP

//PETICIONES GET
ruta.get('/', (req, res) => {

    try
    {
        let result = getMarcas()
        result.then( marcas => res.json({ marcas }) )
            .catch( err => res.status(400).json({ 
                mensaje: 'No se encontraron marcas de vehiculos',
                err
            }) )
    }
    catch(err){
        res.status(400).json({ err })
    }

})

//PETICION GET (Marcas por ID)
ruta.get('/:id', (req, res) => {
    let id_marca = req.params.id;

    let result = getMarcasID( id_marca );
    result.then( marcas => {
        res.json({ marcas })
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

    try{
        let result = createMarca( body )
        result.then( marca => {
            res.json({ marca })
        })
        .catch( err => {
            res.status(400).json({
                mensaje: 'Ocurrio un problema al insertar la marca',
                err
            })
        })
    }
    catch(err)
    {
        res.status(400).json({
            err
        })
    }
});

//PETICIONES PUT
ruta.put('/:id', (req, res) => {

    let body = req.body;
    let id = req.params.id

    let result = updateMarca(id, body);
    result.then( marca => {
        res.json({ marca })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al modificar la marca',
            err
        })
    })
});

//PETICION DELETE
ruta.delete('/:id', (req, res) => {
    let id = req.params.id;

    let result = deleteMarca( id );
    result.then( marca => {
        res.json({ marca })
    })
    .catch( err => {
        res.status(400).json({
            mensaje: 'Ocurrio un problema al eliminar la marca',
            err
        })
    })
})


//FUNCIONES CRUD DE MARCAS

//FUNCION PARA OBTENER LA MARCAS DE LA BD
async function getMarcas()
{
    return await await Marca.findAll({
        where: {
            estado: 0
        }
    });
}

//FUNCION PARA OBTENER LAS MARCAS POR ID
async function getMarcasID( id_marca )
{
    return await Marca.findAll({
        where: {
            id_marca_PK: id_marca,
            estado: 0
        }
    })
}


//FUNCION PARA CREAR UNA MARCA
async function createMarca(body)
{
    return await Marca.create({ marca: body.marca });
}

//FUNCION PARA MODIFICAR O ACTUALIZAR UNA MARCA
async function updateMarca(id, body)
{
    return await Marca.update({ marca: body.marca }, {
        where: {
            id_marca_PK: id
        }
    })
}

//FUNCION PARA ELIMINAR UNA MARCA, EN ESTE CASO SOLO CAMBIA EL ESTADO DE ESTA
async function deleteMarca(id)
{
    return await Marca.update({ estado: 1 }, {
        where: {
            id_marca_PK: id
        }
    })
}

module.exports = ruta;