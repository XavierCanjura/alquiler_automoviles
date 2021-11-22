import React, { useEffect, useContext } from 'react';

import { AuthContext } from '../../../contexts/AuthContext';

//LOGOUT PARA MOVIL
export const Logout = () => {
    
    const { changeAuth } = useContext(AuthContext);

    useEffect( () => {
        changeAuth();
    }, [])

    return null
}

//LOGOUT PARA WEB
export const LogoutWeb = () => {}