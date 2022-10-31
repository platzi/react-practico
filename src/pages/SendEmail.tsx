import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/SendEmail.scss';
import logo from '@logos/green.png';
import emailIcon from '@icons/email.svg';
import { useHistory } from 'react-router-dom';
import { useAuth } from '@redux/Auth';

const SendEmail = () => {
	const history = useHistory();
	const { user, recovery, email, RecoveryPasswordRedux } = useAuth();
	const handleSubmit = async (event) => {
	  event.preventDefault();  
	  await RecoveryPasswordRedux({email});
	  if (recovery === 200) {
		history.push("/correo-enviado");
		toast.success(`${email} se ha enviado un correo para recuperar tu contraseña.`);
	  }else{
		toast.error(`${email} hubo un error intenta de nuevo.`);
	  }
	};
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
		<div className="SendEmail">
			<div className="form-container">
				<img src={logo} alt="logo" className="logo" />
				<h1 className="title">Correo electrónico enviado !</h1>
				<p className="subtitle">Consulte su bandeja de entrada para obtener instrucciones sobre cómo restablecer la contraseña.</p>
				<div className="email-image">
					<img src={emailIcon} alt="email" />
				</div>
				<button className="primary-button login-button" onClick={()=> history.push('/iniciar-sesión')} >Iniciar sesión</button>
				<p className="resend">
					<span>¿No recibiste el correo electrónico? </span>
					<a className='button-reenviar' onClick={handleSubmit}>Reenviar</a>
				</p>
			</div>
			<ToastContainer />
		</div>
	);
}

export default SendEmail;
