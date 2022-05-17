import React, { useRef } from 'react';
import '@styles/Login.scss';
import logo from '@Logos/logo_yard_sale.svg'

const Login = () => {

    const form = useRef(null);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			usename: formData.get('email'),
			password: formData.get('contraseña')
		}
		console.log(data);
	}

	return (
		<div className="login">
        <div className="contenedor-formulario">
            <img src={logo} alt="logo" className="logo" />
            <form action="/" className="form" ref={form}>
                <label htmlFor="email" className="label">Dirección de email</label>
                <input type="text" name="email" placeholder="dirección@..." className="input input-email"/>
                <label htmlFor="contraseña" className="label">Contraseña</label>
                <input type="password" name="contraseña" placeholder="*******" className="input input-password"/>
                <button
						onClick={handleSubmit}
						className="primary-button login-button">
						Iniciar Sesión
					</button>
                <a href="./">Olvide mi contraseña</a>
            </form>
            <button className="secondary-button signup-button">Inscribirse</button>
        </div>
    </div>
	);
}

export default Login;
