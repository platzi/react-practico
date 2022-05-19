import React from 'react';
import '@styles/RecoveryPassword.scss';
import logo from '@Logos/logo_yard_sale.svg';

const RecoveryPassword = () => {
	return (
		<div className="RecoveryPassword">
			<div className="RecoveryPassword-container">
				<img src={logo} alt="logo" className="RecoveryPassword-logo" />
				<h1 className="title">Recuperar contraseña</h1>
				<p className="subtitle">Ingrese el email con el que creo su cuenta</p>
				<form action="/" className="form">
					<label htmlFor="email" className="label">Dirección de email</label>
					<input type="text" id="email" placeholder= "ingresar email..." className="input input-email" />
					<input type="submit" value="Confirm" className="primary-button login-button" />
				</form>
			</div>
		</div>
	);
}

export default RecoveryPassword;