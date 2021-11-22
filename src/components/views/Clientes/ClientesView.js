import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const ClienteView = () => {
    return(
        <View style = {{backgroundColor: ''}}>
            <View styles = { styles.container }>
                <Text>CLIENTES</Text>
                <TextInput></TextInput>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        backgroundColor: '#A8A8B2',
    },
    texto: {
        fontSize: 25,
    }
})


export default ClienteView;