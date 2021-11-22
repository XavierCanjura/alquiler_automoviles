import { lazy } from "react";

//Rutas Privadas
export const routesPriv = [
  {
    path: "",
    component: lazy(() => import("../views/saludo/Saludo")),
    exact: true,
  },
  {
    path: "home",
    component: lazy(() => import("../views/home/Home")),
    exact: true,
  },
  {
    path: "marcas",
    component: lazy(() => import("../views/Marcas/Marcas")),
    exact: true,
  },
  {
    path: "modelos",
    component: lazy(() => import("../views/Modelos/Modelos")),
    exact: true,
  },
  {
    path: "alquileres",
    component: lazy(() => import("../views/Alquileres/Alquileres")),
    exact: true,
  },
  {
    path: "vehiculos",
    component: lazy(() => import("../views/vehiculos/Vehiculos")),
    exact: true,
  },
  {
    path: "clientes",
    component: lazy(() => import("../views/Clientes/Clientes")),
    exact: true,
  },
  {
    path: "perfil",
    component: lazy(() => import("../views/profile/Profile")),
    exact: true,
  },
  // {
  //     path: 'signout',
  //     component: lazy(() => import('../views/')),
  //     exact: true
  // },
];

//Rutas publicas
export const routesPublic = [
  {
    path: "",
    component: lazy(() => import("../views/home/Home")),
    exact: true,
  },
  {
    path: "Home",
    component: lazy(() => import("../views/home/Home")),
    exact: true,
  },
  {
    path: "Autos",
    component: lazy(() => import("../views/vehiculos/Vehiculos")),
    exact: true,
  },
  {
    path: "Login",
    component: lazy(() => import("../views/login/Login")),
    exact: true,
  },
  {
    path: "Modelos",
    component: lazy(() => import("../views/Modelos/Modelos")),
    exact: true,
  },
  {
    path: "Marcas",
    component: lazy(() => import("../views/Marcas/Marcas")),
    exact: true,
  },
  {
    path: "Clientes",
    component: lazy(() => import("../views/Clientes/Clientes")),
    exact: true,
  },
  {
    path: "Detalle",
    component: lazy(() => import("../views/detalleVehiculo/DetalleVehiculo")),
    exact: true,
  },
  {
    path: "Perfil",
    component: lazy(() => import("../views/profile/Profile")),
    exact: true,
  },
  {
    path: "SignUp",
    component: lazy(() => import("../views/signup/Signup")),
    exact: true,
  },
];
