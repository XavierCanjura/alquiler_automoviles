//FUNCION DINAMICA PARA HAER PETICIONES FETCH LOS PARAMETROA QUE SE NECESITAN SON:
//URL: URL DE DONDE SE HARA LA PETICION
//METHOD: TIPO DE PETICION QUE SE HARA (GET, POST, PUT, DELETE)
//BODY: LOS DATOS QUE SE ENVIARAN DONDE SEA NECESARIO A LA API
const FetchAPI = async (url, method, body) => {
    var Request = {};

    if (method === "GET") {
        Request = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
        };
    } else {
        Request = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
    }

    try {
        const response = await fetch(url, Request);
        const json = response.json();
        return json;
    } catch (error) {
        return error;
    }


};

export default FetchAPI;
