import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import Navigation from './src/components/navigation/Navigation';
import Login from './src/components/views/login/Login';

import { AuthContext } from './src/contexts/AuthContext'; 

export default function App() {
  
    const [ auth, setAuth ] = useState(false);
    const [ typeUser, setTypeUser ] = useState(0);
    const [ idUser, setIdUser ] = useState(0);
    const [ idVehiculo, setIdVehiculo ] = useState(0);
    const [ infoAlqui, setInfoAlqui ] = useState({
    entrega: {
        lugar: '',
        fecha: ''
    },
    devolucion: {
        lugar: '',
        fecha: ''
    },
    precio_neto: 0 })
    
    const changeAuth = () => setAuth(!auth);

    const dataAuth = {
        changeAuth,
        setTypeUser,
        setIdUser,
        typeUser,
        idUser,
        auth,
        idVehiculo,
        setIdVehiculo,
        infoAlqui,
        setInfoAlqui
    }

    return(
        <>
            <AuthContext.Provider value={ dataAuth }>
                <Navigation />
            </AuthContext.Provider>
        </>
    )

}
