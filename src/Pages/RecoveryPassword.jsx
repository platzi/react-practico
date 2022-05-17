import React from 'react';
import '@styles/RecoveryPassword.scss';
import logo from '@Logos/logo_yard_sale.svg';
import imgEmail from '@Iconos/email.svg';

const RecoveryPassword = () => {
    return (
        <div className="login">
        <div className="contenedor-formulario">
            <img src={logo} alt="logo" className="nav-logo"/>
            <h1 className="title">Se ha enviado el email!</h1>
            <p className="subtitle">Por favor, revise su bandeja de entrada y siga las instrucciones para restablecer la contraseña</p>
            <div className="email-image">
                <img src={imgEmail} alt="email"/>
            </div>
            <button className="primary-button login-button">Acceso</button>
            <p className="resend">
                <span>No recibiste el email?</span>
                <a href="/">Reenviar</a>
            </p>
        </div>
    </div>
    );
}

export default RecoveryPassword;