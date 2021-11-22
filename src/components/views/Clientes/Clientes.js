import React from 'react';
import ClienteView from './ClientesView';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const Cliente = () => {
    return(
        <View style={{backgroundColor:'#1C2530'}} >
        <ClienteView />
        </View>
    )
}

export default Cliente;