import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TextInput,ScrollView, TouchableOpacity,FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { urlModelos } from '../../../consts/URLs';
import FetchAPI from '../../../utils/FetchAPI';
import CardModelo from '../../common/CardModelo.native';
import { alertMovilAction } from '../../../utils/Alert';
import ButtonFloating from '../../common/ButtonFloating.native';
import ModalModelo from '../../common/ModalModelos.native';

const ModelosView = () => {
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ modelos, setModelos ] = useState([]);
    const [ idModelo, setIdModelo] = useState(0);
    const [ alert, setAlert ] = useState(false);

    //FUNCION PARA OBTENER LAS MARCAS
    const getModelos = () => {
        let modelosAPI = FetchAPI(urlModelos, 'GET', {});
        modelosAPI.then( data => {
            setModelos([...data.modelos]);
        })
    }
    useEffect(() => {
        if(!modalVisible)
        {
            getModelos()
        }
    }, [modalVisible])

    //FUNCION PARA ELIMINAR MARCAS
    const deleteModelo = () => {
        const modeloAPI = FetchAPI(`${urlModelos}${idModelo}`, 'DELETE', {});
        modeloAPI.then( data => {
            getModelos();
            setAlert(false)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        if(alert)
        {
            alertMovilAction('Eliminar Modelo', `¿Desea eliminar el modelo?`, deleteModelo, setAlert)
            console.log(modalVisible)
        }
    }, [alert])



    return(
        <View>
            <FlatList 
                    data = { modelos }
                    renderItem = { (item) =>  <CardModelo  data = { item } setIdAuto = { setIdModelo } setModalVisible = { setModalVisible } setAlert = { setAlert } />}
                    keyExtractor = { item => item.id_modelos_PK.toString() }
            />

            <ButtonFloating modalVisible = { modalVisible } setModalVisible = { setModalVisible } changeId = { setIdModelo } />

            { modalVisible ? (
                <ModalModelo
                    modalVisible = { modalVisible } 
                    setModalVisible = { setModalVisible }
                    idMarca = { idModelo }
                />
            ) : (null)}
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

export default ModelosView;