const { DataTypes } = require('Sequelize');
const sequelize = require('./database');
const TipoUserModel = require('./tipos_usuario');

//MODELO DE USUARIOS
const UserModel = sequelize.define('usuarios', {
        id_usuario_PK: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_tipo_usuario_FK: {
            type: DataTypes.INTEGER
        },
        nombres: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        apellidos: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        usuario: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        fecha_nacimiento: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        direccion: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        telefono: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        estado: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        modelName: 'usuarios',
        timestamps: false
    }
);

//REFERENCIA DE MODEL DE TIPO USUARIO
UserModel.hasOne( TipoUserModel, { as: 'tipo', sourceKey: 'id_tipo_usuario_FK', foreignKey: 'id_tipo_usuario_PK' } )

module.exports = UserModel;