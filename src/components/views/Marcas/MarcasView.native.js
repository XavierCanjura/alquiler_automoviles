import React,{useEffect,useState,useContext} from 'react';
import { View, Text, StyleSheet, TextInput,ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { urlMarcas } from '../../../consts/URLs';
import FetchAPI from '../../../utils/FetchAPI';
import { AuthContext } from '../../../contexts/AuthContext';
import { alertMovilAction } from '../../../utils/Alert';
import CardMarca from '../../common/CardMarca.native';
import ButtonFloating from '../../common/ButtonFloating.native';
import ModalMarca from '../../common/ModalMarcas.native';

const MarcasView = () => {

    const [ modalVisible, setModalVisible ] = useState(false);
    const [ Marcas, setMarcas ] = useState([]);
    const [ idMarca, setIdMarca] = useState(0);
    const [ alert, setAlert ] = useState(false);

    const { typeUser, setIdVehiculo } = useContext(AuthContext)

    //FUNCION PARA OBTENER LAS MARCAS
    const getMarcas = () => {
        let autosAPI = FetchAPI(urlMarcas, 'GET', {});
        autosAPI.then( data => {
            setMarcas([...data.marcas]);
        })
    }
    useEffect(() => {
        if(!modalVisible)
        {
            getMarcas()
        }
    }, [modalVisible])

    //FUNCION PARA ELIMINAR MARCAS
    const deleteMarca = () => {
        const autoAPI = FetchAPI(`${urlMarcas}${idMarca}`, 'DELETE', {});
        autoAPI.then( data => {
            getMarcas();
            setAlert(false)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        if(alert)
        {
            alertMovilAction('Eliminar Marca', `¿Desea eliminar la Marca?`, deleteMarca, setAlert)
            console.log(modalVisible)
        }
    }, [alert])


    return(
        <View>
            <FlatList 
                    data = { Marcas }
                    renderItem = { (item) =>  <CardMarca  data = { item } setIdAuto = { setIdMarca } setModalVisible = { setModalVisible } setAlert = { setAlert } />}
                    keyExtractor = { item => item.id_marca_PK.toString() }
                />
            
                <ButtonFloating modalVisible = { modalVisible } setModalVisible = { setModalVisible } changeId = { setIdMarca } />

            { modalVisible ? (
                <ModalMarca
                    modalVisible = { modalVisible } 
                    setModalVisible = { setModalVisible }
                    idMarca = { idMarca }
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

export default MarcasView;
