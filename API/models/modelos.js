const { Sequelize, DataTypes } = require('Sequelize');
const sequelize = require('./database');
const Marca = require('./marcas')

//Modelo de Modelos de vehiculo
const ModeloModel = sequelize.define('modelos', {
        id_modelos_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_marca_FK: {
            type: DataTypes.INTEGER,
        },
        modelo: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: 'modelos',
        timestamps: false
    }
)

//Referencia de Models
//modeloHijo.hasOne( modeloPadre, { as: alias, sourceKey: atributo FK de modelohijo , foreignKey: atributo PK de modeloPadre } )
ModeloModel.hasOne(Marca, { as: 'marca', sourceKey: 'id_marca_FK', foreignKey: 'id_marca_PK' })

module.exports = ModeloModel;

//Tipos de referencia
/*
    BelongsTo - pertenece a
    hasOne - uno a uno
    hasMany - uno a muchos
    belongsToMany - pertenece a muchos
*/