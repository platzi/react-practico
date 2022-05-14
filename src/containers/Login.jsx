import React from 'react';
import '../styles/Login.scss';

const Login = () => {
	return (
		<div className="login">
        <div className="contenedor-fomulario">
            <img src="./Logos/logo_yard_sale.svg" alt="logo" className="logo"/>
            <h1 className="title">Crear nueva contraseña</h1>
            <p className="subtitle">Ingrese nueva contraseña para su cuenta</p>        
            <form action="/" className="form">
                <label for="contraseña" className="label">Contraseña</label>
                <input type="password" id="contraseña" placeholder="*******" className="input input-password"/>
                <label for="nueva-contraseña" className="label">Contraseña</label>
                <input type="password" id="nueva-contraseña" placeholder="*******" className="input input-password"/>
                <input type="submit" value="Confirmar" className="primary-button login-button"/>
            </form>
        </div>
    </div>
	);
}

export default Login;
