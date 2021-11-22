import React, { useContext, useEffect, useState } from 'react';
import { Text, TextInput, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

//URL de API
import { urlUsuarios } from '../../../consts/URLs';

//Context
import { AuthContext } from '../../../contexts/AuthContext';

//FetchAPI
import FetchAPI from '../../../utils/FetchAPI';

//Validaciones
import { validationString, validationNumber, validationEmail } from '../../../utils/Validations';

//ALERTs
import { alertMovil } from '../../../utils/Alert';

const ProfileView = () => {

    const { idUser } = useContext(AuthContext);
    const [ infoUser, setInfoUser ] = useState({
        id_tipo_usuario: 0,
        nombres: '',
        apellidos: '',
        email: '',
        usuario: '',
        password: '',
        password_confirm: '',
        fecha_nacimiento: '',
        direccion: '',
        telefono: ''
    })

    useEffect(() => {
        getUser()
    }, [])
    
    //FUNCION PARA OBTENER LOS DATOS DEL USUARIO LOGGEADO
    const getUser = () => {
        const userAPI = FetchAPI(`${urlUsuarios}${idUser}`, 'GET');

        userAPI.then( user => {
            setInfoUser({
                ...infoUser,
                id_tipo_usuario: user[0].id_tipo_usuario_FK,
                nombres: user[0].nombres,
                apellidos: user[0].apellidos,
                email: user[0].email,
                usuario: user[0].usuario,
                password: user[0].password,
                password_actual: '',
                password_new: '',
                password_confirm: '',
                fecha_nacimiento: user[0].fecha_nacimiento,
                direccion: user[0].direccion,
                telefono: String(user[0].telefono)
            })
        })
        .catch( err => {
            console.log('err: '+ err);
        })
    }
    //FUNCION PARA MODIFICAR LOS DATOS DEL USUARIO LOGGEADO
    const updateUser = () => {
        if(validationForm())
        {
            const userAPI = FetchAPI(`${urlUsuarios}${idUser}`, 'PUT', infoUser);

            userAPI.then( user => {
                // alertMovil('Informacion', 'Datos Modificados')
            })
            .catch( err => {
                console.log('error: '+err);
            })

            if(infoUser.password_actual !== '' || infoUser.password_new !== '' || infoUser.password_confirm !== '')
            {
                if(validationPasswords())
                {
                    const userAPI = FetchAPI(`${urlUsuarios}perfil/${idUser}`, 'PUT', infoUser);

                    userAPI.then( user => {
                        if(user.mensaje)
                        {
                            alertMovil('Advertencia', user.mensaje);
                        }
                        else
                        {
                            alertMovil('Informacion', 'Contraseña modificada')
                        }
                    })
                    .catch( err => {
                        console.log('error: '+err);
                    })
                }
            }
        }

    }
    //FUNCION PARA VALIDAR EL FORMULARIO
    const validationForm = () => {
        if(validationString(infoUser.nombres))
        {
            if(validationString(infoUser.apellidos))
            {
                if(validationEmail(infoUser.email))
                {
                    if(validationString(infoUser.usuario))
                    {
                        if(validationString(infoUser.fecha_nacimiento))
                        {
                            return true;
                        }
                        else
                        {
                            alertMovil('Advertencia', 'Ingrese su fecha de nacimiento');
                            return false
                        }
                    }
                    else
                    {
                        alertMovil('Advertencia', 'Ingrese su usuario');
                        return false;
                    }
                }
                else
                {
                    alertMovil('Advertencia', 'Ingrese un correo valido');
                    return false;
                }
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese sus nombres');
                return false;
            }
        }
        else
        {
            alertMovil('Advertencia', 'Ingrese sus nombres');
            return false;
        }
    }
    //FUNCION PARA VALIDAR LOS CAMPOS DE CONTRASEÑA
    const validationPasswords = () => {
        if(validationString(infoUser.password_actual))
        {
            if(validationString(infoUser.password_new))
            {
                if(validationString(infoUser.password_confirm))
                {
                    if(infoUser.password_new === infoUser.password_confirm)
                    {
                        return true;
                    }
                    else
                    {
                        alertMovil('Advertencia', 'Las nuevas contraseñas no son iguales');
                        return false;
                    }
                }
                else
                {
                    alertMovil('Advertencia', 'Confirme su nueva contraseña')
                    return false;
                }
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese su nueva contraseña')
                return false;
            }
        }
        else
        {
            alertMovil('Advertencia', 'Ingrese su contraseña actual')
            return false;
        }
    }

    return(
        <ScrollView style = {{ backgroundColor: '#1C2530', height: '100%' }}>
            <View style = { styles.card }>
                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Nombres</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese sus nombres'
                        value = { infoUser.nombres }
                        onChangeText = { text => setInfoUser({ ...infoUser, nombres: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Apellidos</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese sus apellidos'
                        value = { infoUser.apellidos }
                        onChangeText = { text => setInfoUser({ ...infoUser, apellidos: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Correo electrónico</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese su correo'
                        value = { infoUser.email }
                        onChangeText = { text => setInfoUser({ ...infoUser, email: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Usuario</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese su usuario'
                        value = { infoUser.usuario }
                        onChangeText = { text => setInfoUser({ ...infoUser, usuario: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Fecha de nacimiento</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese su fecha de nacimiento'
                        value = { infoUser.fecha_nacimiento }
                        onChangeText = { text => setInfoUser({ ...infoUser, fecha_nacimiento: text }) }
                    />
                </View>
            </View>

            <Text style = {[ styles.text, { fontSize: 24, textAlign: 'center' } ]}>Cambio de Contraseña</Text>

            <View style = { styles.card }>
                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Contraseña actual</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese su contraseña actual'
                        secureTextEntry = {true}
                        value = { infoUser.password_actual }
                        onChangeText = { text => setInfoUser({ ...infoUser, password_actual: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Contraseña nueva</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Ingrese su contraseña nueva'
                        secureTextEntry = {true}
                        value = { infoUser.password_new }
                        onChangeText = { text => setInfoUser({ ...infoUser, password_new: text }) }
                    />
                </View>

                <View style = {{ marginVertical: 5 }}>
                    <Text style={ styles.text }>Confirmar contraseña nueva</Text>
                    <TextInput
                        style = { styles.input }
                        placeholder = 'Confirme su nueva contraseña'
                        secureTextEntry = {true}
                        value = { infoUser.password_confirm }
                        onChangeText = { text => setInfoUser({ ...infoUser, password_confirm: text }) }
                    />
                </View>
            </View>

            <TouchableOpacity
                style = { styles.button }
                onPress = { () => updateUser() }
            >
                <Text style = {[ styles.text, { fontSize: 20 } ]}>Guardar Cambios</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#A1A1AB',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
    },
    text: {
        color: '#F5F3EA',
        fontSize: 16,
    },
    input: {
        height: 50,
        backgroundColor: '#F0F0F060',
        color: '#F5F3EA',
        paddingLeft: 5,
        fontSize: 18,
    },
    button: {
        minHeight: 40,
        backgroundColor: '#F7B661',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default ProfileView;