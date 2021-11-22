import React, { useEffect, useState } from 'react';
import { View, Modal, Pressable, StyleSheet, Text, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-elements';
import FetchAPI from '../../utils/FetchAPI';

//URL's API
import { urlAutos, urlMarcas } from '../../consts/URLs';

//ALERT
import { alertMovil } from '../../utils/Alert';

//FUNCIONES PARA VALIDAR
import { validationString } from '../../utils/Validations';

const ModalAuto = ({ modalVisible, setModalVisible, idMarca }) => {

    const [ data, setData ] = useState({
        placa: "",
    })

    //FUNCION PARA CREAR LOS AUTOS
    const createVehiculo = () => {
        if(validacionForm())
        {
            let MarcaNew = FetchAPI(urlMarcas, 'POST', data);
            MarcaNew.then( data => {
                if( data.id_marca_PK !== 0 )
                {
                    console.log('La marca se creo');
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
            const autoAPI = FetchAPI(`${urlMarcas}/${data.id_auto}`, 'PUT', data);
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
                    if( validationString(data.marca) )
                    {
                        return true;
                    }
                    else
                    {
                        alertMovil('Advertencia', 'Ingrese el nombre de la marca');
                        return false;
                    }        
    }

    useEffect( () => {
        if(idMarca > 0)
        {
            let MarcaAPI = FetchAPI(`${urlMarcas}/${idMarca}`, 'GET', {});
            MarcaAPI.then( data => {
                const { id_marca_PK, marca} = data.marcas[0];
                setData({
                    ...data,
                    id_auto: id_marca_PK,
                    marca: marca,
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
                        <Text style = { styles.title }>Crear Marca</Text>
                    ) : (
                        <Text style = { styles.title }>Modificar Marca</Text>
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
                >Ingresar la información de la Marca</Text>
                <ScrollView style={styles.modalView}>
                    <Text style={{ textAlign: 'left' }}>Nombre</Text>
                    <TextInput 
                        style = { styles.input }
                        placeholder = 'Ingrese la marca del vehículo'
                        onChangeText = { text => setData({...data, marca: text }) }
                        value = { data.marca }
                    />
                </ScrollView>

                { idMarca === 0 ? (
                    <Pressable
                        style = { styles.button }
                        onPress = { () => createVehiculo() }
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