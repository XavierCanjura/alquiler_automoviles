import React, { useEffect, useState } from 'react';
import { SearchBar } from 'react-native-elements';

const InputSearch = ({ placeholder, SearchMethod }) => {
    const [ value, setValue ] = useState('');

    useEffect( () => { console.log(value); }, [value])

    return(
        <SearchBar
            placeholder="Buscar Vehículo"
            onChangeText={ search => setValue(search) }
            value={ value }
            containerStyle={{backgroundColor: "#1C2530", width:'100%', borderRadius: 10, borderBottomWidth: 0 }}
        />
    )
}

export default InputSearch;