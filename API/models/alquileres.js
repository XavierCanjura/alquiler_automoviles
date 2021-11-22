const { DataTypes } = require('sequelize');
const sequelize = require('./database');
const AutoModel = require('./autos');
const UserModel = require('./usuarios');

//MODELO DE ALQUILER
const AlquilerModel = sequelize.define('alquileres', {
        id_alquiler_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario_FK: {
            type: DataTypes.INTEGER
        },
        id_auto_FK: {
            type: DataTypes.INTEGER
        },
        lugar_entrega: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        fecha_entrega: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        lugar_devolucion: {
            type: DataTypes.STRING(70),
            allowNull: false
        },
        fecha_devolucion: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        dias_alquiler: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        precio_neto: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        precio_total: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        modelName: 'alquileres',
        timestamps: false
    }
)

//REFERENCIAS
AlquilerModel.hasOne( AutoModel, { as: 'auto', sourceKey: 'id_auto_FK', foreignKey: 'id_auto_PK' });
AlquilerModel.hasOne( UserModel, { as: 'usuario', sourceKey: 'id_usuario_FK', foreignKey: 'id_usuario_PK' });

module.exports = AlquilerModel;