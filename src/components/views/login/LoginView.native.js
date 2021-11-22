import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import Splash from '../splash/SplashView.native';

//IMPORT DE FETCH
import FetchAPI from '../../../utils/FetchAPI'; 

//IMPORTS DE URL API
import { urlAuth, urlUsuarios } from '../../../consts/URLs';

//IMPORTS DE VALIDACIONES
import { validationString, validationEmail, validationNumber } from '../../../utils/Validations';

//IMPORT DE ALERT
import { alertMovil } from '../../../utils/Alert';

//IMPORT DE CONTEXT DE AUTH
import { AuthContext } from '../../../contexts/AuthContext';

const LoginView = () => {

    const [ loading, setLoading ] = useState(true);
    const [ registrar, setRegistrar ] = useState(false);
    const [ datos, setDatos ] = useState({
        id_tipo_usuario: 3,
        nombres: '',
        apellidos: '',
        email: '',
        usuario: '',
        password: '',
        password_confirm: '',
        fecha_nacimiento: '',
        direccion: '',
        telefono: ''
    });

    const { changeAuth, setTypeUser, setIdUser } = useContext(AuthContext);

    const LoginAPi = () => {
        const authAPI = FetchAPI(urlAuth, 'POST', datos);

        authAPI.then( user => {
            if(user.message)
            {
                alertMovil('Advertencia', user.message);
            }
            else
            {
                setIdUser(user.usuario.id)
                setTypeUser(user.usuario.tipo_usuario)
                changeAuth();
            }
        })
        .catch( err => {
            console.log('error:'+err);
        })
    }

    //FUNCION PARA INICIAR SESION EN EL LOGIN
    const loginUser = () => {
        if( validationString(datos.usuario) )
        {
            if( validationString(datos.password) )
            {
                LoginAPi();
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese su contraseña')
            }
        }
        else
        {
            alertMovil('Advertencia', 'Ingrese su usuario')
        }
    }

    //FUNCION PARA CREAR USUARIOS DESDE EL LOGIN 
    const createUser = () => {
        if( validationString(datos.nombres) )
        {
            if( validationString(datos.apellidos) )
            {
                if( validationEmail(datos.email) )
                {
                    if( validationString(datos.fecha_nacimiento) )
                    {
                        if( validationString(datos.direccion) )
                        {
                            if( validationNumber(datos.telefono) )
                            {
                                if( validationString(datos.usuario) )
                                {
                                    if( validationString(datos.password) )
                                    {
                                        if( validationString(datos.password_confirm) )
                                        {
                                            if( datos.password === datos.password_confirm )
                                            {
                                                const userAPI = FetchAPI(urlUsuarios, 'POST', datos);

                                                userAPI.then( user => {
                                                    if(user.id_usuario_PK)
                                                    {
                                                        alertMovil('Información', 'Usuario creado')
                                                        setRegistrar(false);
                                                    }
                                                    else
                                                    {
                                                        alertMovil('Información', 'Ocurrio un problema al momento de crear el usuario')
                                                    }
                                                })
                                                .catch( err => {
                                                    console.log(err);
                                                })
                                                
                                            }
                                            else
                                            {
                                                alertMovil('Advertencia', 'Las contraseñas no son iguales')
                                            }
                                        }
                                        else
                                        {
                                            alertMovil('Advertencia', 'Ingrese de nuevo su contraseña')
                                        }
                                    }
                                    else
                                    {
                                        alertMovil('Advertencia', 'Ingrese su contraseña')
                                    }
                                }
                                else
                                {
                                    alertMovil('Advertencia', 'Ingrese un usuario')
                                }
                            }
                            else
                            {
                                alertMovil('Advertencia', 'Ingrese su telefono')
                            }
                        }
                        else
                        {
                            alertMovil('Advertencia', 'Ingrese su direccion')
                        }
                    }
                    else
                    {
                        alertMovil('Advertencia', 'Ingrese su fecha de nacimiento')
                    }
                }
                else
                {
                    alertMovil('Advertencia', 'Ingrese un correo valido')
                }
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese sus apellidos')
            }
        }
        else
        {
            alertMovil('Advertencia', 'Ingrese sus nombres')
        }
    }

    setTimeout( () => {
        setLoading(false);
    }, 3000)

    if(loading)
    {
        return(
            <Splash />
        )
    }

    return(
        <View style = { styles.container }>
            <Image
                containerStyle = { styles.img }
                resizeMode = 'stretch'
                source = {{ uri: 'https://images.pexels.com/photos/445399/pexels-photo-445399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }}
            />

            { registrar ? (
                <View style = { styles.containerRegistrar }>
                    <Text style = { styles.title }>Registrar</Text>
                    <Text  style = { styles.text }>Registrate con nosotros</Text>
                    <View style = {{ height: '65%', display: 'flex', marginBottom: 10}}>
                        <ScrollView>
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Nombres'
                                onChangeText = { text => setDatos({...datos, nombres: text})}
                                value = { datos.nombres }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Apellidos'
                                onChangeText = { text => setDatos({...datos, apellidos: text})}
                                value = { datos.apellidos }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Correo Electrónico'
                                onChangeText = { text => setDatos({...datos, email: text})}
                                value = { datos.correo }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Fecha de nacimiento'
                                onChangeText = { text => setDatos({...datos, fecha_nacimiento: text})}
                                value = { datos.fecha_nacimiento }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Direccion'
                                onChangeText = { text => setDatos({...datos, direccion: text})}
                                value = { datos.direccion }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Número de teléfono'
                                onChangeText = { text => setDatos({...datos, telefono: Number(text) })}
                                keyboardType = 'numeric'
                                value = { String(datos.telefono) }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Usuario'
                                onChangeText = { text => setDatos({...datos, usuario: text})}
                                value = { datos.usuario }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Contraseña'
                                secureTextEntry = {true}
                                onChangeText = { text => setDatos({...datos, password: text})}
                                value = { datos.password }
                            />
                            <TextInput
                                style = { [styles.input, { marginVertical: 5}] }
                                placeholder = 'Confirmar contraseña'
                                onChangeText = { text => setDatos({...datos, password_confirm: text})}
                                secureTextEntry = {true}
                            />
                        </ScrollView>
                    </View>
                    

                    <TouchableOpacity
                        onPress = { () => setRegistrar(false)}
                    >
                        <Text style = { styles.text }>¿Ya tienes cuenta?
                            <Text> </Text>
                            <Text style = { [styles.text, { textDecorationLine: 'underline', marginTop: 0 }] }>Iniciar sesión</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { styles.button }
                        onPress = { () => createUser()}
                    >
                        <Text style = { styles.text }>Registrar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style = { styles.containerForm }>
                    <Text style = { styles.title }>Bienvenido</Text>
                    <Text  style = { styles.text }>Ingrese sus datos</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Usuario'
                        onChangeText = { text => setDatos({...datos, usuario: text})}
                        value = { datos.usuario }
                    />
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Contraseña'
                        secureTextEntry = {true}
                        onChangeText = { text => setDatos({...datos, password: text})}
                        value = { datos.password }
                    />

                    <TouchableOpacity
                        onPress = { () => setRegistrar(true)}
                    >
                        <Text style = { styles.text }>¿No tienes cuenta?
                            <Text> </Text>
                            <Text style = { [styles.text, { textDecorationLine: 'underline', marginTop: 0 }] }>Registrate aquí</Text>
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style = { styles.button }
                        onPress = { () => loginUser()}
                    >
                        <Text style = { styles.text }>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
            ) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginTop: 30,
        backgroundColor: '#000',
    },
    img: {
        width: '100%',
        height: '60%',
        
    },
    containerForm: {
        position: 'absolute',
        elevation: 5,
        width: '100%',
        height: '60%',
        backgroundColor: '#1C2530',
        bottom: 0,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingTop: 25,
        paddingHorizontal: 20
    },
    title: {
        color: '#FFF',
        fontSize: 26,
        letterSpacing: 0.5,
        marginBottom: 10
    },
    text: {
        color: '#FFF',
        fontSize: 18,
        letterSpacing: 0.5,
    },
    input: {
        marginVertical: 15,
        height: 50,
        backgroundColor: '#FFFC',
        paddingLeft: 10,
        fontSize: 18,
        borderRadius: 15,
    },
    button: { 
        backgroundColor: '#F7B661', 
        height: 40, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 20,
        top: 30,
        width: '100%',
    },

    containerRegistrar: {
        position: 'absolute',
        elevation: 5,
        width: '100%',
        height: '90%',
        backgroundColor: '#1C2530',
        bottom: 0,
        borderTopStartRadius: 50,
        borderTopEndRadius: 50,
        paddingTop: 25,
        paddingHorizontal: 20
    }
})

export default LoginView;