const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios');
const ruta = express.Router();

//PETIFCION POST PARA LOGIN
ruta.post('/', (req, res) => {
    let { body } = req

    let result = getUsuario(body);
    result.then( user => {
        if(user)
        {
            const passwordValido = bcrypt.compareSync( body.password, user.password )
            if(!passwordValido) return res.status(400).json({ message: 'Contraseña incorrecta' })

            res.json({
                usuario: {
                    id: user.id_usuario_PK,
                    tipo_usuario: user.id_tipo_usuario_FK,
                    usuario: user.usuario
                }
            })
        }
        else
        {
            res.status(400).json({
                message: 'Usuario incorrecto'
            })
        }
    })
    .catch( err => {
        res.status(400).json({ err })
    })
})

//FUNCION PARA OBTENER UN USUARIO CON RESPETO A SU NOMBRE DE USUARIO
async function getUsuario(body)
{
    return await Usuario.findOne({
        where: {
            estado: 0,
            usuario: body.usuario
        }
    })
}

module.exports = ruta;