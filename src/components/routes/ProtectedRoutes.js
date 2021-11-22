import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { routesPriv, routesPublic } from "./routes";

//Mapea la rutas autenticadas 
const ProtectedRoutesPriv = () => (
    <Switch>
        <Suspense fallback = { <h1>Cargando...</h1> }>
            {
                routesPriv.map( ({ component: Component, path, exact }) => (
                    <Route 
                        path = { `/dash/${path}`}
                        key = { path }
                        exact = { exact }
                    >
                        <Component />
                    </Route>
                ))
            }
        </Suspense>
    </Switch>
)

export default ProtectedRoutesPriv;

export const ProtectedRoutesPublic = () => (
    <Switch>
        <Suspense fallback = { <h1>Cargando...</h1> }>
            {
                routesPublic.map( ({ component: Component, path, exact }) => (
                    <Route 
                        path = { `/public/${path}`}
                        key = { path }
                        exact = { exact }
                    >
                        <Component />
                    </Route>
                ))
            }
        </Suspense>
    </Switch>
)