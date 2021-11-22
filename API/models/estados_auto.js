const { DataTypes } = require('Sequelize');
const sequelize = require('./database');

//MODELO DE LOS ESTADOS DE LOS AUTOS
const EstadoAutoModel = sequelize.define( 'estados_auto', {
        id_estado_auto_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        estado_auto: {
            type: DataTypes.STRING(25)
        }
    },
    {
        tableName: 'estados_auto',
        timestamps: false
    }
);

module.exports = EstadoAutoModel;