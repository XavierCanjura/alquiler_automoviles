import React from 'react';
import '../../views/signup/Signup.css';

const FormSuccess = () => {
  return (
    <div className='form-content-right'>
      <h1 className='form-success'>¡Hemos recibido tu solicitud!</h1>
      <img className='form-img-2' src='https://freesvg.org/img/rocket-312767.png' alt='success-image' />
    </div>
  );
};

export default FormSuccess;
