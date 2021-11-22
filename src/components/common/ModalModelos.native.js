import React, { useEffect, useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-elements';
import FetchAPI from '../../utils/FetchAPI';
import {Picker} from '@react-native-picker/picker';

//URL's API
import { urlMarcas,urlModelos } from '../../consts/URLs';

//ALERT
import { alertMovil } from '../../utils/Alert';

//FUNCIONES PARA VALIDAR
import { validationString, validationNumber } from '../../utils/Validations';

const ModalAuto = ({ modalVisible, setModalVisible, idMarca }) => {
    const [ marca, setMarca ] = useState(0);
    const [ marcas, setMarcas ] = useState([]);

    const [ data, setData ] = useState({
        id_marca: "",
        modelo: "",
        estado: 0,
    })

    //PARA OBTENER MARCAS
    useEffect( () => {
        let marcasAPI = FetchAPI(urlMarcas, 'GET', {});
        marcasAPI.then( data => {
            setMarcas([...data.marcas])
        })
    }, [])

    //FUNCION PARA CREAR LOS AUTOS
    const createVehiculo = () => {
        if(validacionForm())
        {
            let vehiculoNew = FetchAPI(urlModelos, 'POST', data);
            vehiculoNew.then( data => {
                if( data.id_modelos_PK !== 0 )
                {
                    console.log('el vehiculo se creo');
                    reset();
                    setModalVisible(false);
                }
            })
            .catch( err => { console.log(err) })
        }
    }

    //FUNCION PARA MODIFICAR LOS AUTOS
    const updateVehiculo = () => {
        if(validacionForm())
        {
            const autoAPI = FetchAPI(`${urlModelos}/${data.id_auto}`, 'PUT', data);
            autoAPI.then( data => {
                reset();
                setModalVisible(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    const validacionForm = () => {
        if( validationNumber(marca) )
        {
            if( validationString(data.modelo) )
            {
                return true;
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese el modelo');
                return false;
            }
        }
        else
        {
            alertMovil('Advertencia', 'Seleccione una marca');
            return false;
        }
    }

    useEffect( () => {
        if(idMarca > 0)
        {
            let MarcaAPI = FetchAPI(`${urlModelos}//${idMarca}`, 'GET', {});
            MarcaAPI.then( data => {
                const { id_modelos_PK, id_marca_FK, modelo} = data.modelos[0];
                setMarca(id_marca_FK)
                setData({
                    ...data,
                    id_auto: id_modelos_PK,
                    id_marca: id_marca_FK,
                    modelo: modelo,
                })
            })
        }
        else
        {
            reset()
        }
    }, [idMarca, modalVisible])

    //FUNCION PARA RESETEAR LOS CAMPOS
    const reset = () => {
        setData({
            placa: "",
        })
    }

    return(
        <Modal
            animationType="slide"
            visible={ modalVisible }
            animationType = 'slide'
            presentationStyle = 'fullScreen'
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style = { styles.header } >
                    { idMarca === 0 ? (
                        <Text style = { styles.title }>Crear Modelo</Text>
                    ) : (
                        <Text style = { styles.title }>Modificar Modelo</Text>
                    ) }
                    
                    <Pressable
                        onPress = { () => { reset(); setModalVisible(!modalVisible)} }
                    >
                        <Icon name = 'close' size={30} color='#FFF' /> 
                    </Pressable>
                </View>
                <Divider style = {{ borderBottomWidth: 5 }} />
                <Text 
                    style = {{ color: '#FFF', paddingHorizontal: 20, fontSize: 18, marginTop: 10, textAlign: 'center' }}
                >Ingresar la información del modelo</Text>
                <ScrollView style={styles.modalView}>
                <Text style={{ textAlign: 'left' }}>Marca</Text>
                    <View style = { styles.containerPicker }>
                        <Picker
                            style = { styles.picker }
                            selectedValue={ marca }
                            onValueChange={(itemValue, itemIndex) => setMarca(  itemValue ) }>
                            <Picker.Item label="Seleccione la marca" value="" />
                            { marcas.map( (marca, index) => (
                                <Picker.Item label={ marca.marca } value={ marca.id_marca_PK } key = { index } />
                            )) }
                        </Picker>
                    </View>

                    <Text style={{ textAlign: 'left' }}>Nombre</Text>
                    <TextInput 
                        style = { styles.input }
                        placeholder = 'Ingrese el modelo del vehículo'
                        onChangeText = { text => setData({...data, modelo: text }) }
                        value = { data.modelo }
                    />
                </ScrollView>

                { idMarca === 0 ? (
                    <Pressable
                        style = { styles.button }
                        onPressIn = {() => (setData({...data, id_marca: marca }))}
                        onPressOut = { () => createVehiculo() }
                    >
                        <Text style = { styles.textButton }>Crear</Text>
                    </Pressable>
                ) : (
                    <Pressable
                        style = { styles.button }
                        onPress = { () => updateVehiculo() }
                    >
                        <Text style = { styles.textButton }>Modificar</Text>
                    </Pressable>
                )}
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor: '#1C2530'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 20,
        backgroundColor: '#F7B661',
    },
    title: {
        fontSize: 24,
        width: '80%',
        color: '#FFF'
    },
    modalView: {
      marginHorizontal: 20,
      backgroundColor: "white",
      paddingHorizontal: 20,
      marginTop: 15,
      borderRadius: 15,
      marginBottom: 15
    },
    containerPicker: {
        borderWidth: 1,
        width: '100%',
        marginBottom: 10
    },
    picker: {
        width: '100%',
        height: 50,
        borderWidth: 1,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#F7B661',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default ModalAuto