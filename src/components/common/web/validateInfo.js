export default function validateInfo(values) {
    let errors = {};
  
    if (!values.username.trim()) {
      errors.username = 'Se requiere el nombre del usuario';
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
  
    if (!values.email) {
      errors.email = 'Se requiere el correo';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Correo electrónico no válido';
    }
    if (!values.password) {
      errors.password = 'Se requiere contraseña';
    } else if (values.password.length < 6) {
      errors.password = 'La contraseña requiere caracteres o más';
    }
  
    if (!values.password2) {
      errors.password2 = 'Se requiere la contraseña';
    } else if (values.password2 !== values.password) {
      errors.password2 = 'Las contraseñas no coinciden';
    }
    return errors;
  }