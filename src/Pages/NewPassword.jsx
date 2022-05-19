import React from 'react';
import '@styles/NewPassword.scss';
import logo from '@Logos/logo_yard_sale.svg';

const NewPassword = () => {
	return (
		<div className="NewPassword">
			<div className="NewPassword-container">
				<img src={logo} alt="logo" className="NewPassword-logo" />
				<h1 className="title">Crear nueva Contraseña</h1>
				<p className="subtitle">Ingresar nueva contraseña</p>
				<form action="/" className="form">
					<label for="password" className="label">Contraseña</label>
					<input type="password" id="password" placeholder="*******" className="input input-password" />
					<label for="new-password" className="label">Contraseña</label>
					<input type="password" id="new-password" placeholder="*******" className="input input-password" />
					<input type="submit" value="Confirm" className="primary-button login-button" />
				</form>
			</div>
		</div>
	);
}

export default NewPassword;