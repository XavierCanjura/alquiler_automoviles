import { Alert } from 'react-native';

//ALERTS PARA APP MOVIL
//LOS PARAMETROS QUE RECIBEN SON:
//title:    TEXTO QUE SALDRA EN EL TITULO DEL ALERT
//message:  MENSAJE QUE SE VA A MOSTRAR EN EL ALERT
export const alertMovil = (title, message) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: "Entendido",
                style: "cancel"
            }
        ]
    );
}

//ALERT CON ACCIONES
//LOS PARAMETROS QUE RECIBEN SON:
//title:    TEXTO QUE SALDRA EN EL TITULO DEL ALERT
//message:  MENSAJE QUE SE VA A MOSTRAR EN EL ALERT
//action:   FUNCION QUE SE REALIZARA SI EL USUARIO CONFIRMA
//setAlert: CAMBIA EL ESTADO DEL ALERT PARA OCULTARLO
export const alertMovilAction = (title, message, action, setAlert) => {
    Alert.alert(
        title,
        message,
        [
            {
                text: "No",
                onPress: () => setAlert(false),
                style: "cancel"
            },
            { text: "Si", onPress: () => action() }
        ]
    );
}
