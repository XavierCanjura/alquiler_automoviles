import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SaludoView = () => {
    return(
        <View styles = { styles.container }>
            <Text style = { styles.texto }>Bienvenido</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    },
    texto: {
        fontSize: 34,
        textAlign: 'center'
    }
})

export default SaludoView;