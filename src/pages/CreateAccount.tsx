import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "@styles/CreateAccount.scss";
import logo from "@logos/green.png";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "@redux/Auth";

const CreateAccount = () => {
  const form = useRef(null);
  const { loading, register, RegisterUserRedux } = useAuth();
  const [validatePassword, setValidatePassword] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const [validateName, setValidateName] = useState(false);

  const handleValidate = (event, name) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    switch (name) {
      case "name":
        if (
          formData.get(name) == null ||
          formData.get(name).length <= 8 ||
          /^\s+$/.test(formData.get(name))
        ) {
          document.getElementById("nameInput").style.border = "1px solid red";
          document.getElementById("nameInput").style.color = "red";
          document.getElementById("name").style.display = "block";
          document.getElementById("name").style.color = "red";
          document.getElementById("name").innerHTML = "Nombre invalido";
          setValidateName(false);
        } else {
          document.getElementById("nameInput").style.border = "1px solid green";
          document.getElementById("nameInput").style.color = "green";
          document.getElementById("name").style.display = "none";
          document.getElementById("name").style.color = "green";
          document.getElementById("name").innerHTML = "";
          setValidateName(true);
        }

        break;
      case "email":
        if (
          /^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|es)+$/.test(
            formData.get(name)
          )
        ) {
          document.getElementById("emailInput").style.border =
            "1px solid green";
          document.getElementById("emailInput").style.color = "green";
          document.getElementById("email").style.display = "none";
          document.getElementById("email").style.color = "green";
          document.getElementById("email").innerHTML = "";
          setValidateEmail(true);
        } else {
          document.getElementById("emailInput").style.border = "1px solid red";
          document.getElementById("emailInput").style.color = "red";
          document.getElementById("email").style.display = "block";
          document.getElementById("email").style.color = "red";
          document.getElementById("email").innerHTML = "Correo invalido";
          setValidateEmail(false);
        }
        break;
      case "password":
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/.test(formData.get(name))) {
          document.getElementById("passwordInput").style.border =
            "1px solid green";
          document.getElementById("passwordInput").style.color = "green";
          document.getElementById("password").style.display = "none";
          document.getElementById("password").style.color = "green";
          document.getElementById("password").innerHTML = "";
          setValidatePassword(true);
        } else {
          document.getElementById("password").style.marginTop = "-20px";
          document.getElementById("password").style.marginBottom = "20px";
          document.getElementById("passwordInput").style.border =
            "1px solid red";
          document.getElementById("passwordInput").style.color = "red";
          document.getElementById("password").style.display = "block";
          document.getElementById("password").style.color = "red";
          document.getElementById("password").innerHTML =
            "La contraseñas debe contener al menos 8 caracteres, un numero, una letra mayúscula, no permite espacios o caracteres especiales.";
          setValidatePassword(false);
        }
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "admin",
    };
    await RegisterUserRedux(payload);
    if (register === 201) {
      toast.success("Usuario creado correctamente");
      window.location.href = "/iniciar-sesión";
    }else{
      toast.error("Email o contraseña incorrectos.");
    }
  };
  return (
    <div className="CreateAccount">
      <div className="CreateAccount-container">
        <img src={logo} alt="logo" className="logo" />
        <h1 className="title">Crear Cuenta</h1>
        <form action="/" className="form" ref={form}>
          <div>
            <label className="label">Nombre</label>
            <span id="name"></span>
            <input
              required
              type="text"
              id="nameInput"
              name="name"
              placeholder="Nombre de usuario"
              className="input input-name"
              onChange={(e) => {
                handleValidate(e, "name");
              }}
            />
            <label className="label">Correo electrónico</label>
            <span id="email"></span>
            <input
              id="emailInput"
              required
              type="text"
              name="email"
              placeholder="aviato@example.com"
              className="input input-email"
              onChange={(e) => {
                handleValidate(e, "email");
              }}
            />
            <label className="label">Contraseña</label>
            <input
              id="passwordInput"
              required
              type="password"
              name="password"
              placeholder="*********"
              className="input input-password"
              onChange={(e) => {
                handleValidate(e, "password");
              }}
            />
            <span id="password"></span>
          </div>
          <LoadingButton
            size="small"
            color="primary"
            className="primary-button login-button"
            onClick={handleSubmit}
            loading={!loading}
            variant="contained"
            disabled={
              validateName && validateEmail && validatePassword ? false : true
            }
          >
            Crear Cuenta
          </LoadingButton>
          <a className="button-submit" href="/iniciar-sesión">
            Iniciar sesión
          </a>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateAccount;
