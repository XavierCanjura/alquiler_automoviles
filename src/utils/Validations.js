//Validar valores String que no sean vacios
export function validationString(value)
{
    if(value.trim() === '')
    {
        return false;
    }
    else
    {
        return true
    }
}

//Validar los valores de tipo numero que no sean menores o iguales a 0
export function validationNumber(value)
{
    try
    {
        var number = Number(value)
        if(number > 0)
        {
            return true;
        }
        else
        {
            return false
        }
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

//Validar formato de correo electronico
export function validationEmail(email)
{
    var regex = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

//Validacion de dos fechas
export function validationDate(dateMin, dateMax)
{
    const fechaMin = dateMin.split('/');
    const fechaMax = dateMax.split('/');

    const formanDateMin = new Date(`${fechaMin[2]}/${fechaMin[1]}/${fechaMin[0]}`)
    const formanDateMax = new Date(`${fechaMax[2]}/${fechaMax[1]}/${fechaMax[0]}`)

    if( !isNaN(formanDateMin) && !isNaN(formanDateMax) )
    {
        if( formanDateMin.getTime() < formanDateMax.getTime() )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}

export function validationDateWeb(dateMin, dateMax)
{
    const formanDateMin = new Date(dateMin);
    const formanDateMax = new Date(dateMax);
    
    if( !isNaN(formanDateMin) && !isNaN(formanDateMax) )
    {
        if( formanDateMin.getTime() < formanDateMax.getTime() )
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else
    {
        return false;
    }
}