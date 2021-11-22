const express = require('express');
const cors = require('cors');
const sequelize = require('./models/database');
const marca = require('./routes/marcas');
const modelo = require('./routes/modelos');
const usuario = require('./routes/usuarios');
const auto = require('./routes/autos');
const alquiler = require('./routes/alquileres');
const auth = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

//Conexion a la DB
sequelize.connection();

//Middlewares
app.use('/api/marcas/', marca);
app.use('/api/modelos/', modelo);
app.use('/api/usuarios/', usuario);
app.use('/api/autos/', auto);
app.use('/api/alquileres/', alquiler);
app.use('/api/auth/', auth)

//Puerto que va usar NODE
const port = 3001;
//listen estara escuchando el puerto 3000
app.listen( port, () => {
    console.log('Apicacion ejecutandose...');
})

