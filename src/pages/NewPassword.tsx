import React, {useEffect} from 'react';
import '@styles/NewPassword.scss';
import logo from '@logos/green.png';
import { useAuth } from '@redux/Auth';

const NewPassword = () => {
	const { user } = useAuth();
	const handleLoginAdmin = () => {
		setTimeout(() => {window.location.href = "/dashboard/contratista/perfil";}, 2000);
	  };
	
	  const handleLoginChecker = () => {
		setTimeout(() => {window.location.href = "/checker/perfil";}, 2000);
	  };
	
	  useEffect(() => {
		if (user) {
		  if (user?.role === "admin") {
			handleLoginAdmin();
		  } else if (user?.role === "checker") {
			handleLoginChecker();
		  }
		}
	  }, []);
	return (
		<div className="NewPassword">
			<div className="NewPassword-container">
				<img src={logo} alt="logo" className="logo" />
				<h1 className="title">Crear una nueva contraseña</h1>
				<p className="subtitle">Ingrese una nueva contraseña para tu cuenta</p>
				<form action="/" className="form">
					<label for="password" className="label">Nueva Contraseña</label>
					<input type="password" id="password" placeholder="*********" className="input input-password" />
					<label for="new-password" className="label">Repetir Contraseña</label>
					<input type="password" id="new-password" placeholder="*********" className="input input-password" />
					<input type="submit" value="Confirmar" className="primary-button login-button" />
				</form>
			</div>
		</div>
	);
}

export default NewPassword;
