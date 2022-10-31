import {
  BrowserRouter as Routes,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "@pages/Login";
import PasswordRecovery from "@pages/PasswordRecovery";
import SendEmail from "@pages/SendEmail";
import NewPassword from "@pages/NewPassword";
import CreateAccount from "@pages/CreateAccount";
import Employees from "@pages/Contractor/Employes";
import Layout from "@containers/Layout";
import Checker from "@containers/Checker/Layout";
import Dashboard from "@containers/Dashboard/Dashboard";
import CheckerList from "@pages/Checker/Checker";
import NotFound from "@pages/NotFound";
import BusinessProfile from "@pages/Business/BusinessProfile";
import ConstructionSite from "@pages/Business/ConstructionSite";
import EngeinerProfile from "@pages/EngeinerProfile/Profile";
import Jobs from "@pages/Business/Jobs";
import Resident from "@pages/Business/Resident";
import ContractorProfile from "@pages/Contractor/ContractorProfile";
import ResumePay from "@pages/Contractor/ResumePay";
import AuthLogin from "./AuthLogin";
import { useAuth } from "@redux/Auth";

const App = () => {
  const { user } = useAuth();
  const role = user?.role;
  return (
    <Routes>
      <Switch>
        <Route path={["/:path?"]} exact>
          <Switch>
            <Layout>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/iniciar-sesión" /> }
              />
              <Route
                exact 
                path="/iniciar-sesión"
                render={() => <Login />}
              />
              <Route
                exact
                path="/recuperar-contrasena"
                render={() => <PasswordRecovery />}
              />
              <Route
                exact
                path="/correo-enviado"
                render={() => <SendEmail />}
              />
              <Route
                exact
                path="/nueva-contrasena"
                render={() => <NewPassword />}
              />
              <Route
                exact
                path="/crear-cuenta"
                render={() => <CreateAccount />}
              />
            </Layout>
          </Switch>
        </Route>
        <Route path={["/checker/:path?"]} exact>
          <Switch>
            <Checker>
              <Route
                exact
                path="/checker/perfil"
                render={() => {
                  return role === "checker" ? (
                    <CheckerList />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
            </Checker>
          </Switch>
        </Route>
        <Route path={["/dashboard/:path?"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/contratista/perfil"
                render={() => {
                  role === "admin" ? (
                    <EngeinerProfile />
                  ) : (
                   <Redirect to="/checker/perfil" />
                  );
                }}
              />
            </Dashboard>
          </Switch>
        </Route>
        <Route path={["/dashboard/contratista/:path?"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/contratista/perfil"
                render={() => {
                  role === "admin" ? (
                    <ContractorProfile />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/contratista/trabajadores"
                render={() => {
                  role === "admin" ? (
                    <Employees />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/contratista/resumen-de-pagos"
                render={() => {
                  role === "admin" ? (
                    <ResumePay />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
            </Dashboard>
          </Switch>
        </Route>
        <Route path={["/dashboard/empresa/:path?"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/empresa/perfil"
                render={() => {
                  role === "admin" ? (
                    <BusinessProfile />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/empresa/construction-site"
                render={() => {
                  role === "admin" ? (
                    <ConstructionSite />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/empresa/puestos"
                render={() => {
                  role === "admin" ? (
                    <Jobs />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/empresa/residentes"
                render={() => {
                  role === "admin" ? (
                    <Resident />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
            </Dashboard>
          </Switch>
        </Route>
      </Switch>
    </Routes>
  );
};

export default App;
