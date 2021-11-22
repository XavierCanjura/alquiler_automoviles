import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput,ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

//URL's
import { urlAlquileres } from '../../../consts/URLs';

//Context
import { AuthContext } from '../../../contexts/AuthContext';

//Validations
import { validationDate, validationString } from '../../../utils/Validations';

//FETCHAPI
import FetchAPI from '../../../utils/FetchAPI';

//Alert
import { alertMovil } from '../../../utils/Alert';

const Alquileres = [
  {
      id: '1',
      nombre: 'Kevin Albert',
      carro: 'Elantra',
      tiempo: '4',
      estado: 'Alquilado',
  },
  {
      id: '2',
      nombre: 'Elena Vizcaino',
      carro: 'Rio',
      tiempo: '17',
      estado: 'Reservado',
  },
  {
      id: '3',
      nombre: 'Maria Belen Mansilla',
      carro: 'Soul',
      tiempo: '12',
      estado: 'Reservado',
  },
]


const AlquilerView = () => {

    const navigation = useNavigation();

    const { typeUser, idVehiculo, infoAlqui, setInfoAlqui, idUser } = useContext( AuthContext );
    const [ precioTotal, setPrecioTotal ] = useState(0)
    const [ dias, setDias ] = useState(0);

    const createAlquiler = () => {
        if( validacionForm() )
        {
            const data = {
                id_usuario: idUser,
                id_auto: idVehiculo,
                lugar_entrega: infoAlqui.entrega.lugar,
                fecha_entrega: infoAlqui.entrega.fecha,
                lugar_devolucion: infoAlqui.devolucion.lugar,
                fecha_devolucion: infoAlqui.devolucion.fecha,
                dias_alquiler: dias,
                precio_neto: infoAlqui.precio_neto,
                precio_total: precioTotal 
            }

            const alquilerAPI = FetchAPI(`${urlAlquileres}`, 'POST', data);

            alquilerAPI.then( alquiler => {
                if(alquiler)
                {
                    alertMovil('Información', 'Alquiler creado');
                }
            })
            .catch( err => {
                console.log('error: '+err);
            })
        }
    }

    const validacionForm = () => {

        if(validationDate( infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha ))
        {
            if( validationString(infoAlqui.entrega.lugar) )
            {
                if( validationString(infoAlqui.devolucion.lugar) )
                {
                    return true;
                }
                else
                {
                    alertMovil('Advertencia', 'Ingrese el lugar de devolución');
                    return false;
                }
            }
            else
            {
                alertMovil('Advertencia', 'Ingrese el lugar de entrega');
                return false;
            }
        }
        else
        {
            alertMovil('Advertencia', 'Ingrese fechas validas')
        }
    }

    //FUNCION PARA CALCULAR LOS DIAS DE DIFERENCIA ENTRE LAS FECHAS
    const calcularDias = () => {
        if(validationDate( infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha ))
        {
            const fechaMin = infoAlqui.entrega.fecha.split('/');
            const fechaMax = infoAlqui.devolucion.fecha.split('/');

            const fechaIni = new Date(`${fechaMin[2]}/${fechaMin[1]}/${fechaMin[0]}`).getTime();
            const fechaFin = new Date(`${fechaMax[2]}/${fechaMax[1]}/${fechaMax[0]}`).getTime();

            const diff = fechaFin - fechaIni;

            setDias(diff/(1000*60*60*24));

            return diff/(1000*60*60*24)
        }
        else
        {
            setDias(0);
            return 0
        }
    }

    useEffect( () => {
        if(validationDate( infoAlqui.entrega.fecha, infoAlqui.devolucion.fecha ))
        {
            setPrecioTotal( infoAlqui.precio_neto * calcularDias() )
        }
    }, [infoAlqui])

    if( typeUser === 3)
    {
        return(
            <View style = {{ backgroundColor: '#1C2530', height: '100%' }}>
                <View style = { styles.card }>
                    <View style = {{ marginVertical: 5 }}>
                        <Text style = { styles.textAlqui }>Lugar de entrega</Text>
                        <TextInput
                            onChangeText={( text ) => {
                                setInfoAlqui({ ...infoAlqui, entrega: { ...infoAlqui.entrega, lugar: text} })
                            }}
                            value = { infoAlqui.entrega.lugar }
                            placeholder = 'Ingrese la fecha de entrega'
                            style = { styles.inputAlqui }
                        />
                    </View>
    
                    <View style = {{ marginVertical: 5 }}>
                        <Text style = { styles.textAlqui }>Fecha de entrega</Text>
                        <MaskedTextInput
                            mask = '99/99/9999'
                            keyboardType = 'phone-pad'
                            onChangeText={( text ) => {
                                setInfoAlqui({ ...infoAlqui, entrega: { ...infoAlqui.entrega, fecha: text} })
                            }}
                            value = { infoAlqui.entrega.fecha }
                            placeholder = 'Ingrese la fecha de entrega'
                            style = { styles.inputAlqui }
                        />
                    </View>
    
                    <View style = {{ marginVertical: 5 }}>
                        <Text style = { styles.textAlqui }>Lugar de devolución</Text>
                        <TextInput
                            onChangeText={( text ) => {
                                setInfoAlqui({ ...infoAlqui, devolucion: { ...infoAlqui.devolucion, lugar: text} })
                            }}
                            value = { infoAlqui.devolucion.lugar }
                            placeholder = 'Ingrese la fecha de entrega'
                            style = { styles.inputAlqui }
                        />
                    </View>
    
                    <View style = {{ marginVertical: 5 }}>
                        <Text style = { styles.textAlqui }>Fecha de devolución</Text>
                        <MaskedTextInput
                            mask = '99/99/9999'
                            keyboardType = 'phone-pad'
                            onChangeText={( text ) => {
                                setInfoAlqui({ ...infoAlqui, devolucion: { ...infoAlqui.devolucion, fecha: text} })
                            }}
                            value = { infoAlqui.devolucion.fecha }
                            placeholder = 'Ingrese la fecha de entrega'
                            style = { styles.inputAlqui }
                        />
                    </View>
                </View>
    
                
    
                { idVehiculo !== 0 ? (
                    <>
                        <View style = { styles.card }>
                            <Text 
                                style={{ textAlign: 'center', fontSize: 24, color: '#F5F3EA' }}
                            >Total a pagar: ${ precioTotal }</Text>
                        </View>
                        
                        <TouchableOpacity
                            style = { styles.button }
                            onPress = { () => createAlquiler() }
                        >
                            <Text style={[styles.textAlqui, { fontSize: 22 }]}>Confirmar Alquiler</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <Text style={[styles.textAlqui, { fontSize: 22, textAlign: 'center' }]}>Necesitas elegir un vehículo para alquilar</Text>
                        <TouchableOpacity
                            style = { styles.button }
                            onPress = { () => navigation.navigate('Vehiculos') }
                        >
                            <Text style={[styles.textAlqui, { fontSize: 22 }]}>Ver vehículos</Text>
                        </TouchableOpacity>
                    </>
                ) }
                
            </View>
        )
        
    }
    else
    {
        return(
            <View >
                <FlatList
                    ListHeaderComponent = {(
                    <SearchBar 
                        placeholder="Buscar Alquiler..." 
                        containerStyle={{backgroundColor: "#1C2530", width:'100%', borderRadius: 10, borderBottomWidth: 0 }}
                    />
                    )}
                    data = { Alquileres }
                    keyExtractor= { ( item ) => item.id }
                    renderItem = { ( {item} ) => (
                        <View style = {styles.container}>
                            <Text style={styles.title}>Nombre</Text>
                            <TextInput style={styles.textInput} value={item.nombre} editable={false} placeholderTextColor="#D8D4CF"  placeholder="Nombre de cliente"></TextInput>
                            <Text style={styles.title}>Vehiculo</Text>
                            <TextInput style={styles.textInput} value={item.carro} editable={false} placeholderTextColor="#D8D4CF"  placeholder="Vehiculo"></TextInput>
                            <Text style={styles.title}>Tiempo de alquiler</Text>
                            <TextInput style={styles.textInput} value={item.tiempo} editable={false} placeholderTextColor="#D8D4CF"  placeholder="Tiempo de alquiler"></TextInput>
                            <Text style={styles.title}>Estado</Text>
                            <TextInput style={styles.textInput} value={item.estado} editable={false} placeholderTextColor="#D8D4CF"  placeholder="Estado"></TextInput>
                            <TouchableOpacity style={styles.boton}><Text style={styles.textoBoton}>Ver más</Text></TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: '#A1A1AB',
        margin: 20,
        justifyContent: 'center',
        textAlign: 'center',
        display: 'flex',
        paddingTop: 20,
    },
    texto: {
        fontSize: 25,
    },
    textInput:{
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#A1A1AB",
        marginBottom: 10,
        color: '#fff',
        borderBottomColor: '#D8D4CF',
        borderBottomWidth: 2,
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        paddingBottom: 6,
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        opacity: 0.8,
      },
    boton:{
        marginTop: 10,
        backgroundColor: '#F7B661',
        margin: 0,
        width: '100%',
    },
    textoBoton:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
    },
    inputContainer: {
        justifyContent: 'center',
    },
    input: {
        height: 50,
    },
    icon: {
        position: 'absolute',
        right: 10,
    },
    card: {
        backgroundColor: '#A1A1AB',
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
    },
    inputAlqui: {
        height: 50,
        backgroundColor: '#F0F0F060',
        color: '#F5F3EA',
        paddingLeft: 5,
        fontSize: 18,
    },
    textAlqui: {
        color: '#F5F3EA',
        fontSize: 16,
    },
    button: {
        minHeight: 50,
        backgroundColor: '#F7B661',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    }
})

export default AlquilerView;