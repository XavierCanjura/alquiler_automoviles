import React, { useEffect, useState, useContext } from 'react';
import { Alert, FlatList, View } from 'react-native';
import CardAuto from '../../common/CardAuto.native';
import ButtonFloating from '../../common/ButtonFloating.native';
import InputSearch from '../../common/InputSearch.native';
import ModalAuto from '../../common/ModalAuto.native';
import FetchAPI from '../../../utils/FetchAPI';

//URL API
import { urlAutos } from '../../../consts/URLs';

//Alert
import { alertMovilAction } from '../../../utils/Alert';

//Context
import { AuthContext } from '../../../contexts/AuthContext';


const VehiculosView = () => {
    
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ autos, setAutos ] = useState([]);
    const [ idAuto, setIdAuto] = useState(0);
    const [ alert, setAlert ] = useState(false);

    const { typeUser, setIdVehiculo } = useContext(AuthContext)

    //FUNCION PARA OBTENER LOS VEHICULOS
    const getAutos = () => {
        let autosAPI = FetchAPI(urlAutos, 'GET', {});
        autosAPI.then( data => {
            setAutos([...data])
        })
    }
    useEffect(() => {
        if(!modalVisible)
        {
            getAutos()
        }
    }, [modalVisible])

    //FUNCION PARA ELIMINAR VEHICULOS
    const deleteVehiculo = () => {
        const autoAPI = FetchAPI(`${urlAutos}${idAuto}`, 'DELETE', {});

        autoAPI.then( data => {
            getAutos();
            setAlert(false)
        })
        .catch( err => {
            console.log(err);
        })
    }

    useEffect( () => {
        if(alert)
        {
            alertMovilAction('Eliminar vehículo', `¿Desea eliminar el vehículo?`, deleteVehiculo, setAlert)
        }
    }, [alert])


    return(
        <View style = {{ backgroundColor: '#1C2530', height: '100%' }}>
            <InputSearch />
            <View
                style = {{ height: '90%' }}
            >
                <FlatList 
                    data = { autos }
                    renderItem = { (item) =>  <CardAuto  data = { item } setIdAuto = { setIdAuto } setModalVisible = { setModalVisible } setAlert = { setAlert } />}
                    keyExtractor = { item => item.id_auto_PK.toString() }
                />
                
            </View>

            { typeUser === 3 ? ( null ) : (
                <ButtonFloating modalVisible = { modalVisible } setModalVisible = { setModalVisible } changeId = { setIdAuto } />
            ) }

            { modalVisible ? (
                <ModalAuto 
                    modalVisible = { modalVisible } 
                    setModalVisible = { setModalVisible }
                    idAuto = { idAuto }
                />
            ) : (null) }
        </View>
    )
}


export default VehiculosView;