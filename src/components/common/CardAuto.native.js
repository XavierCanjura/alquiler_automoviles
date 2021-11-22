import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//import { useNavigation } from '@react-navigation/native';

//Context dee Auth
import { AuthContext } from '../../contexts/AuthContext';

const CardAuto = ({ data, setIdAuto, setModalVisible, setAlert }) => {

    //const navigation = useNavigation();

    const { typeUser, setIdVehiculo, setInfoAlqui, infoAlqui } = useContext( AuthContext );

    const { id_auto_PK, anio, placa, precio_dia, transmision, pasajeros, puertas, ac, motor, vidrios_electricos, imagen, modelo} = data.item;
    
    
    return(
        <Card
            containerStyle = { styles.card }
        >
            <Card.Image
                containerStyle = { styles.image }
                resizeMode = 'stretch'
                source = {{ uri: imagen }}
            />   
            <Card.Title style = { styles.title }>{` ${modelo.marca.marca} ${modelo.modelo}`}</Card.Title>
            <View style = {{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <View style = { styles.containerDescripcion }>
                    <Text style= { styles.descripcion }>Placa: {placa}</Text>
                    <Text style= { styles.descripcion }>Año: {anio}</Text>
                    <Text style= { styles.descripcion }>Precio por día: ${precio_dia}</Text>
                    <View style = {{ display: 'flex', flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <Icon name = 'air-conditioner' size={18} color="white" style = { styles.babge }> {ac}</Icon>
                        <Icon name = 'car-seat' size={18} color="white" style = { styles.babge }> {pasajeros}</Icon>
                        <Icon name = 'car-shift-pattern' size={18} color="white" style = { [styles.babge, { width: '50%' }] }> {transmision}</Icon>
                    </View>
                </View>
                { typeUser === 3 ? (
                    <View style = { styles.containerButton } >
                        <Button 
                            title = 'Elegir vehículo' 
                            containerStyle = { styles.buttonSelect } 
                            buttonStyle = {{ backgroundColor: '#F7B661', borderRadius: 0 }}
                            onPress = { () => { 
                                setIdVehiculo(id_auto_PK); 
                                setInfoAlqui({ ...infoAlqui, precio_neto: Number(precio_dia) })
                                //navigation.navigate('Alquileres'); 
                            } }
                        />
                    </View>
                ):(
                    <View style = { styles.containerButton } >
                        <Button 
                            title = 'Editar' 
                            containerStyle = { styles.button } 
                            buttonStyle = {{ backgroundColor: '#F7B661', borderRadius: 0 }}
                            onPress = { () => {setIdAuto(id_auto_PK); setModalVisible(true) } }
                            
                        />
                        <Button 
                            title = 'Eliminar' 
                            containerStyle = { styles.button } 
                            buttonStyle = {{ backgroundColor: '#FF000090', borderRadius: 0 }}
                            onPress = { () => {setIdAuto(id_auto_PK); setAlert(true) } }
                        />
                    </View>
                ) }
                
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 0,
        borderRadius: 5,
        borderWidth: 0,
        backgroundColor: '#A1A1AB'
    },
    image: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    title: {
        fontSize: 20,
    },
    containerDescripcion: {
        paddingHorizontal: '5%',
        marginBottom: 10,
    },
    descripcion: {
        textAlign: 'justify',
        fontWeight: 'bold',
        fontSize: 18
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        marginHorizontal: '5%',
        marginBottom: 10,
        width: '40%', 
        borderRadius: 0
    },
    babge: {
        backgroundColor: '#F7B661',
        width: '22%',
        borderRadius: 15,
        padding: 5,
        textAlign: 'center',
    },
    buttonSelect: {
        width: '100%',
    }
});

export default CardAuto;