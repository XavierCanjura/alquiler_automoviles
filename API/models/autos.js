const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const ModeloModel = require('./modelos');
const EstadoAutoModel = require('./estados_auto')

//MODELO DE AUTOS
const AutoModel = sequelize.define('autos', {
        id_auto_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_modelo_FK: {
            type: DataTypes.INTEGER
        },
        anio: {
            type: DataTypes.INTEGER(4),
            allowNull: false
        },
        placa: {
            type: DataTypes.STRING(7),
            allowNull: false
        },
        precio_dia: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        transmision: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        pasajeros: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        puertas: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        ac: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        motor: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        vidrios_electricos: {
            type: DataTypes.STRING(2),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        id_estado_auto_FK: {
            type: DataTypes.INTEGER
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: 'autos',
        timestamps: false
    }
)


AutoModel.hasOne( ModeloModel, { as: 'modelo', sourceKey: 'id_modelo_FK', foreignKey: 'id_modelos_PK' });
AutoModel.hasOne( EstadoAutoModel, { as: 'estado_auto', sourceKey: 'id_estado_auto_FK', foreignKey: 'id_estado_auto_PK' });

module.exports = AutoModel;
