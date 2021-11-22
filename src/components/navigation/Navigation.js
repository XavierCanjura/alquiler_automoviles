import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Saludo from '../views/saludo/Saludo';
import Cliente from '../views/Clientes/Clientes'
import Marca from '../views/Marcas/Marcas'
import Modelo from '../views/Modelos/Modelos'
import Alquiler from '../views/Alquileres/Alquileres'
import Vehiculos from '../views/vehiculos/Vehiculos';
import {Logout} from '../views/logout/Logout';
import Profile from '../views/profile/Profile';

import Login from '../views/login/Login';

//Context auth
import { AuthContext } from '../../contexts/AuthContext';

const Drawer = createDrawerNavigator();

const Navigation = () => {

    const { auth, typeUser } = useContext(AuthContext);

    const options = {
        drawerStyle: { backgroundColor: '#1C2530',width: '100%',}, 
        drawerActiveBackgroundColor:{backgroundColor:'white'} , 
        drawerLabelStyle:{marginLeft:20,padding: 10 ,fontWeight: 'bold',color: 'white',fontSize: 30, textAlign: 'center', borderBottomColor: '#F7B661',borderBottomWidth: 5, borderTopColor: '#F7B661',borderTopWidth: 5, }, 
        headerStyle:{backgroundColor:'#9C784B'},
        headerTintColor:'white',
        headerTitleStyle:{fontWeight:'bold', fontSize: 25, textAlign: 'center'},
    }

    if(auth)
    {
        if(typeUser === 3)
        {
            return(
                <NavigationContainer>
                    <Drawer.Navigator 
                        screenOptions={ options }
                    >
                        <Drawer.Screen name='Inicio' component={Saludo} />
                        <Drawer.Screen name='Vehiculos' component={Vehiculos} />
                        <Drawer.Screen name='Alquileres' component={Alquiler} />
                        <Drawer.Screen name='Perfil' component={Profile} />
                        <Drawer.Screen name='Salir' component={Logout} />
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
        else
        {
            return(
                <NavigationContainer>
                    <Drawer.Navigator 
                        screenOptions={ options }
                    >
                        <Drawer.Screen name='Inicio' component={Saludo} />
                        <Drawer.Screen name='Vehiculos' component={Vehiculos} />
                        <Drawer.Screen name='Marcas' component={Marca} />
                        <Drawer.Screen name='Modelos' component={Modelo} />
                        <Drawer.Screen name='Alquileres' component={Alquiler} />
                        <Drawer.Screen name='Clientes' component={Cliente} />
                        <Drawer.Screen name='Perfil' component={Profile} />
                        <Drawer.Screen name='Salir' component={Logout} />
                    </Drawer.Navigator>
                </NavigationContainer>
            )
        }
    }
    else
    {
        return(
            <Login />
        ) 
    }
}

export default Navigation;