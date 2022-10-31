import { useHistory } from "react-router-dom";
  import { useAuth } from "@redux/Auth";
  
  const AuthLogin = () => {
    const history = useHistory();
    const { user } = useAuth();
    const role = user?.role;
   switch (role) {
        case "admin":
            history.push("/dashboard/contratista/perfil");
            break;
        case "checker":
            history.push("/checker/perfil");
            break;
        default:
            history.push("/iniciar-sesión");
            break;
   };
   return (
        <div></div>
   );
  };
  
  export default AuthLogin;
  