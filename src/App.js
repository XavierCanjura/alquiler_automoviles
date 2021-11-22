import React, { Suspense, useState } from "react";
import "./App.css";

//PARA NAVEGACION SPA
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import ProtectedRoutesPriv, { ProtectedRoutesPublic } from "./components/routes/ProtectedRoutes";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { WebNavPublic, WebNavPriv } from "./components/navigation/WebNav";

//CONTEXTS
import { AuthContext } from "./contexts/AuthContext";


function App() { 
    const [ typeUser, setTypeUser ] = useState(0);// Tipos de usuario: 1-Administrador, 2-Empleado, 3-Cliente
    const [ isAuth, setIsAuth ] = useState(false);
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
        precio_neto: 0 
    })
    const changeAuth = () => setIsAuth(!isAuth);

    const dataAuth = {
        changeAuth,
        setTypeUser,
        setIdUser,
        typeUser,
        idUser,
        isAuth,
        idVehiculo,
        setIdVehiculo,
        infoAlqui,
        setInfoAlqui
    }

    return (
        <BrowserRouter>
            <Suspense fallback = { <h1>Cargando...</h1> }>
                <Switch>
                <AuthContext.Provider value = { dataAuth }>
                    {/* RUTAS PUBLICAS */}
                    <PublicRoute
                        path = '/public'
                        isAuth = { isAuth }
                        typeUser = { typeUser }
                    >
                        { /* COMPONENTES PUBLIC */ }
                        <WebNavPublic typeUser = { typeUser }>
                            <ProtectedRoutesPublic/>
                        </WebNavPublic>
                    </PublicRoute>
                    
                    {/* RUTAS PRIVADAS */}
                    <PrivateRoute
                        path = '/dash'
                        isAuth = { isAuth }
                        typeUser = { typeUser }
                    >
                        {/* COMPONENTES PRIVATE*/}
                        <WebNavPriv>
                            <ProtectedRoutesPriv />
                        </WebNavPriv>
                    </PrivateRoute>

                    {/* <Route path = '*' exact = { true }>
                        <Redirect from = '*' to = '/public' />
                    </Route> */}

                    { isAuth && typeUser === 0 ? (
                        changeAuth()
                    ) : (null) }
                </AuthContext.Provider>
                </Switch>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
