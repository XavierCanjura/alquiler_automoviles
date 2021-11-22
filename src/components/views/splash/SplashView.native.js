import React from 'react';
import { Image, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Splash = () => {
    return(
        <View style = {{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', backgroundColor: '#1C2530' }}>
            <View style = {{ marginVertical: 70 }}>
                <Text style = {{ fontSize: 50, letterSpacing: 3, textAlign: 'center', color: '#FFF' }}>Alquiler de</Text>
                <Text style = {{ fontSize: 50, letterSpacing: 3, textAlign: 'center', color: '#FFF' }}>Vehículos</Text>
            </View>
            <Image
                source = { require('../../../assets/gifs/splash.gif') }
                style = {{ width: 300, height: 300 }}
            />
        </View>
    )
}

export default Splash;