import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, isAuth, typeUser, ...rest }) => {
    return(
        <Route 
            {...rest}
            render = {
                ({ location }) => (
                    //Si el usuario no esta autentificado sera dirigido al Home y si lo esta podra acceder a la rutas privadas
                    isAuth ? (
                        <>
                            {/* Si el tipo de usuario es 1(Administrador) o 2(Empleado) podra acceder a la rutas privadas*/}
                            {/* Y si no lo enviara al Home del public*/}
                            { typeUser === 1 || typeUser === 2 ? (
                                children
                            ):(
                                <Redirect 
                                    to={{
                                        pathname: '/public/',
                                        state: { from: location }
                                    }}
                                />
                            ) }
                        </>
                    ) : (
                        <Redirect 
                            to={{
                                pathname: '/public/',
                                state: { from: location }
                            }}
                        />
                    )
                )
            }
        
        />
    )
}

export default PrivateRoute;