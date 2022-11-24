import { useRef, SyntheticEvent, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import logo from "@logos/green.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@redux/Auth";
import "react-toastify/dist/ReactToastify.css";
import "@styles/Login.scss";

const Login = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(true);
  const [redirected, setRedirected] = useState(false);
  const { LoginRedux, user } = useAuth();

  const handleLoginAdmin = () => {
    toast.success("Credenciales correctas");
    setTimeout(() => {setLoading(true);}, 1500);
    setTimeout(() => {window.location.href = "/dashboard/perfil";}, 1300);
  };

  const handleLoginChecker = () => {
    toast.success("Credenciales correctas");
    setTimeout(() => {setLoading(true);}, 1500);
    if(user?.role === "checker") {
      setTimeout(() => {window.location.href = "/dashboard/checker";}, 1300);
    }
    
  };
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (form.current) {
      const formData = new FormData(form?.current as HTMLFormElement);
      const payload = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      setLoading(false);
      await LoginRedux(payload).then((res: any) => {
        setRedirected(true);
      }).catch((err: any) => {
        if(user === undefined && redirected === false){
          setLoading(true);
          toast.error("Usuario o contraseña incorrectos");
        }
      });
    }
  };

  const handleRedirectSigup = () => {
    window.location.href = "/crear-cuenta";
  };

  useEffect(() => {
    if (user) {
      if (user?.role === "admin") {
        handleLoginAdmin();
      } else if (user?.role === "checker") {
        handleLoginChecker();
      }
    }
  }, [redirected === true]);

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
          <a className="button-submit" href="/recuperar-contrasena">
            Recuperar Contrasena
          </a>
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
