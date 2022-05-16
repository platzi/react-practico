import React from 'react';
import '@styles/NewPassword.scss';

const NewPassword = () => {
	return (
		<div className="NewPassword">
			<div className="NewPassword-container">
				<img src="./logos/logo_yard_sale.svg" alt="logo" className="logo" />
				<h1 className="title">Crear nueva Contraseña</h1>
				<p className="subtitle">Ingrese nueva contraseña para su cuenta</p>
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
