const { Sequelize } = require('sequelize');

const database = 'alquiler_autos';
const username = 'root';
const password = '';
const host = 'localhost';

//Se crea la conexion con Sequelize
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql'
});

//Se inicia la conexion con la BD
sequelize.connection = async () => 
{
    try
    {
        await sequelize.authenticate()
    }
    catch(error)
    {
        console.log(error);
        //-4078 Error de conexion
        //1054 Columna desconocida
        //1045 access denied for user
    }
}

sequelize.close = () => {
    console.log('desconectada');
}

module.exports = sequelize;