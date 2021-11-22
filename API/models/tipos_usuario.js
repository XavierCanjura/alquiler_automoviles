const { DataTypes } = require('Sequelize');
const sequelize = require('./database');


//MODELO DE TIPOS DE USUARIO
const TipoUserModel = sequelize.define('tipos_usuario', {
        id_tipo_usuario_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tipo_usuario: {
            type: DataTypes.STRING(25),
            allowNull: false
        }
    },
    {
        tableName: 'tipos_usuario',
        timestamps: false
    }
)

module.exports = TipoUserModel;