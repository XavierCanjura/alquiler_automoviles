const { DataTypes } = require('Sequelize');
const sequelize = require('./database');

//Modelo de marca
const MarcaModel = sequelize.define('marcas', {
        id_marca_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        marca: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: 'marcas',
        timestamps: false
    }
)

module.exports = MarcaModel;