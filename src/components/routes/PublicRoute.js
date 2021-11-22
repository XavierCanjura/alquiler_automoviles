import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ children, isAuth, typeUser, ...rest }) => {
    return(
        <Route
            { ...rest }
            render = {
                ({ location }) => (
                    //Si el usuario esta autentificado sera enviado a la pagina de home y si no solo podra acceder a las rutas publicas
                    !isAuth ? (
                        children
                    ) : (
                        <>
                        {
                            //Si el tipo de usuario es 3(Cliente) mostrara el home public
                            //Si no lo enviara al home de administrador
                            typeUser === 3 ? (
                                children
                            ):(
                                <Redirect
                                    to={{
                                        pathname: '/dash/home',
                                        state: { from: location }
                                    }}
                                />
                            )
                        }
                        </>
                    )
                )
            }
        />
    )
}

export default PublicRoute;