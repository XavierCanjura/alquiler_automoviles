import React, { useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
//Context dee Auth
import { AuthContext } from '../../contexts/AuthContext';

const CardAuto = ({ data, setIdAuto, setModalVisible, setAlert }) => {

    const { typeUser, setIdVehiculo, setInfoAlqui, infoAlqui } = useContext( AuthContext );
    const { id_modelos_PK,id_marca_FK,modelo} = data.item;
    
    return(
        <View style = {styles.container}>
                    <Text style={styles.title}>Modelo</Text>
                    <TextInput style={styles.textInput} editable={false} placeholderTextColor="#D8D4CF"  placeholder="Modelo" value={modelo}></TextInput>
                    <View style={styles.botones}>
                    <TouchableOpacity style={styles.boton1} onPress = { () => {setIdAuto(id_modelos_PK); setModalVisible(true) } }><Text style={styles.textoBoton}>Editar</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.boton2} onPress = { () => {setIdAuto(id_modelos_PK); setAlert(true) } }><Text style={styles.textoBoton}>Eliminar</Text></TouchableOpacity>
                    </View>
        </View>
    )
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
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        opacity: 0.8,
        marginLeft: '6%',
      },
    boton1:{
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#F7B661',
        margin: 0,
        width: '45%'
    },
    boton2:{
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#D32950',
        margin: 0,
        width: '45%'
    },
    botones:{
        flexDirection: "row",
        marginLeft: 5, 
        justifyContent: 'space-evenly'
    },
    textoBoton:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        color: 'white'
    },
})


export default CardAuto;