import React from 'react';
import '@styles/SendEmail.scss';
import logo from '@Logos/logo_yard_sale.svg';
import email from '@Iconos/email.svg';

const SendEmail = () => {
	return (
		<div className="SendEmail">
			<div className="SendEmail-container">
				<img src={logo} alt="logo" className="SendEmail-logo" />
				<h1 className="title">El email fue enviado!</h1>
				<p className="subtitle">Revise su corre y reestablesca su contraseña</p>
				<div className="email-image">
					<img src={email} alt="email" />
				</div>
				<button className="primary-button login-button">Acceder</button>
				<p className="resend">
					<span>No recibiste el email?</span>
					<a href="/">Reenviar</a>
				</p>
			</div>
		</div>
	);
}

export default SendEmail;