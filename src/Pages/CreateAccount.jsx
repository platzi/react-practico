import React from 'react';
import '@styles/CreateAccount.scss';

const CreateAccount = () => {
	return (
		<div className="CreateAccount">
			<div className="CreateAccount-container">
				<h1 className="title">Mi Cuenta</h1>
				<form action="/" className="form">
					<div>
						<label for="name" className="label">Nombre</label>
						<input type="text" id="name" placeholder="matiaschiodo" className="input input-name" />
						<label for="email" className="label">email</label>
						<input type="text" id="email" placeholder="example@mail.com" className="input input-email" />
						<label for="password" className="label">Contraseña</label>
						<input type="password" id="password" placeholder="*******" className="input input-password" />
					</div>
					<input type="submit" value="Create" className="primary-button login-button" />
				</form>
			</div>
		</div>
	);
}

export default CreateAccount;