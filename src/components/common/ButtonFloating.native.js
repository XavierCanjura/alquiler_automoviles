import React from 'react';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ButtonFloating = ({ modalVisible, setModalVisible, changeId }) => {

    return(
        <FAB
            onPress = { () => {setModalVisible(!modalVisible); changeId(0)} }
            placement= 'right'
            color = '#F7B661'
            icon = { () => <Icon name = 'plus' size = {25} color = '#FFF' /> }
            style = {{ elevation: 100 }}
        />
    )
}

export default ButtonFloating;