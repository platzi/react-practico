import React, { useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@styles/Login.scss";
import logo from "@logos/green.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from '@redux/Auth';

const Login = () => {
  const form = useRef(null);
  const { LoginRedux, loading, user } = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current as HTMLFormElement);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    await LoginRedux(payload);
    if (user) {
      window.location.href = "/dashboard/home";
    }else{
      console.log(user);
      toast.error("Email o contraseña incorrectos.");
      //window.location.href = "/";
    }
  }; 
  const handleRedirectSigup = () => {
    window.location.href = "/crear-cuenta";
  };
  return (
    <div className="Login">
      <div className="Login-container">
        <img src={logo} alt="logo" className="logo" />
        <form action="/" className="form" ref={form}>
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <input
            type="text"
            name="email"
            placeholder="platzi@example.cm"
            className="input input-email"
          />
          <label htmlFor="password" className="label">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
          />
          <LoadingButton
            size="small"
            color="primary"
            className="primary-button login-button"
            onClick={handleSubmit}
            loading={!loading}
            variant="contained"
          >
            Iniciar sesión
          </LoadingButton>
          <a className="button-submit" href="/recuperar-contrasena">Recuperar Contrasena</a>
        </form>
        <button
          onClick={handleRedirectSigup}
          className="secondary-button signup-button"
        >
          Crear Cuenta
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
