import React from 'react';
import { View, Text, StyleSheet, TextInput,ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements'

const Clientes = [
  {
      id: '1',
      nombre: 'Pedro Pablo Fraile',
      correo: 'PedroPaile@gmail.com',
      usuario: 'PabloFr12',
      telefono: '7649-2443',
  },
  {
      id: '2',
      nombre: 'Elena Vizcaino',
      correo: 'Elena@gmail.com',
      usuario: 'EleViz12',
      telefono: '6121-1286',
  },
  {
      id: '3',
      nombre: 'Maria Belen Mansilla',
      correo: 'MariBelen@gmail.com',
      usuario: 'MeriBelen33',
      telefono: '7171-1306',
  },
  {
      id: '4',
      nombre: 'Gustavo Escribano',
      correo: 'Gustano@gmail.com',
      usuario: 'GusEs07',
      telefono: '7659-9922',
  },
  {
      id: '5',
      nombre: 'Kevin Albert',
      correo: 'AlbertKev@gmail.com',
      usuario: 'Kev94202',
      telefono: '7240-5960',
  },
]

const ClienteView = () => {
    return(
        <View >
            <FlatList
                ListHeaderComponent = {(
                    <SearchBar 
                        placeholder="Buscar Usuario..."
                        containerStyle={{backgroundColor: "#1C2530", width:'100%', borderRadius: 10, borderBottomWidth: 0 }}
                    />
                )}
                data = { Clientes }
                keyExtractor= { ( item ) => item.id }
                renderItem = { ( {item} ) => (
                    <View style = {styles.container}>
                        <Text style={styles.title}>Nombre</Text>
                        <TextInput style={styles.textInput} editable={false} placeholderTextColor="#D8D4CF" value={item.nombre}  placeholder="Nombre"></TextInput>
                        <Text style={styles.title}>Correo</Text>
                        <TextInput style={styles.textInput} editable={false} placeholderTextColor="#D8D4CF" value={item.correo}   placeholder="Correo"></TextInput>
                        <Text style={styles.title}>Usuario</Text>
                        <TextInput style={styles.textInput} editable={false} placeholderTextColor="#D8D4CF" value={item.usuario}   placeholder="Usuario"></TextInput>
                        <Text style={styles.title}>Telefono</Text>
                        <TextInput style={styles.textInput} editable={false} placeholderTextColor="#D8D4CF" value={item.telefono}   placeholder="Telefono"></TextInput>
                        <TouchableOpacity style={styles.boton}><Text style={styles.textoBoton}>Ver más</Text></TouchableOpacity>
                    </View>
                )}
            />
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
    texto: {
        fontSize: 25,
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
        textAlign: "center",
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
        opacity: 0.8,
      },
    boton:{
        marginTop: 10,
        backgroundColor: '#F7B661',
        margin: 0,
        width: '100%',
    },
    textoBoton:{
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
    },
    inputContainer: {
        justifyContent: 'center',
      },
      input: {
        height: 50,
      },
      icon: {
        position: 'absolute',
        right: 10,
      }
})

export default ClienteView;