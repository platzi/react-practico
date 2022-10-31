import React, { useRef, useState } from "react";
import "@styles/PasswordRecovery.scss";
import logo from "@logos/green.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { useHistory } from "react-router-dom";
import { useAuth } from '@redux/Auth';
const PasswordRecovery = () => {
	const history = useHistory();
  const { user, loading, recovery, RecoveryPasswordRedux } = useAuth(); 
	const form = useRef(null);
  const [validateEmail, setValidateEmail] = useState(false);
	const handleSubmit = async (event) => {
	  event.preventDefault();
	  const formData = new FormData(form.current);
	  const payload = {
		email: formData.get("email"),
	  };
    console.log("🚀 ~ file: PasswordRecovery.tsx ~ line 20 ~ handleSubmit ~ recovery", recovery)
	  await RecoveryPasswordRedux(payload);
    console.log("🚀 ~ file: PasswordRecovery.tsx ~ line 20 ~ handleSubmit ~ recovery", recovery)
	  if (recovery === 200) {
		  history.push("/correo-enviado");
	  }
	};
  const handleValidate = (event, name) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    switch (name) {
      case "email":
        if (/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
            formData.get(name)
          )
        ) {
          document.getElementById("emailInput").style.border = "1px solid green";
          document.getElementById("emailInput").style.color = "green";
          document.getElementById("email").style.display = "none";
          document.getElementById("email").style.color = "green";
          document.getElementById("email").innerHTML = "";
          setValidateEmail(true);
        } else {
          document.getElementById("emailInput").style.border = "1px solid red";
          document.getElementById("emailInput").style.color = "red";
          document.getElementById("email").style.marginTop = "-20px";
          document.getElementById("email").style.marginBottom = "30px";
          document.getElementById("email").style.display = "block";
          document.getElementById("email").style.color = "red";
          document.getElementById("email").innerHTML = "Correo invalido";
          setValidateEmail(false);
        }
        break;
      default:
        break;
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
    <div className="PasswordRecovery">
      <div className="PasswordRecovery-container">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">Restablecer Contraseña</h1>
        <p className="subtitle">Ingresa tu correo electrónico</p>
        <form action="/" className="form" ref={form}>
          <label htmlFor="email" className="label">
            Correo electrónico
          </label>
          <input id="emailInput" type="text" name="email" className="input input-email" onChange={(e) => {
              handleValidate(e, "email");
            }} />
          <span id="email"></span>
          <LoadingButton
            size="small"
            color="primary"
            className="primary-button login-button"
            onClick={handleSubmit}
            loading={!loading}
            variant="contained"
            disabled={!validateEmail}
          >
            Confirmar
          </LoadingButton>
          <a className="button-submit" href="/iniciar-sesión">Iniciar sesión</a>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
