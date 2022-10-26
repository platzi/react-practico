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
import Dashboard from "@containers/Dashboard/Dashboard";
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import BusinessProfile from "@pages/Business/BusinessProfile";
import ConstructionSite from "@pages/Business/ConstructionSite";
import Jobs from "@pages/Business/Jobs";
import Resident from "@pages/Business/Resident";
import ContractorProfile from "@pages/Contractor/ContractorProfile";
import ResumePay from "@pages/Contractor/ResumePay";
import { useAuth } from "@redux/Auth";


const App = () => {
  const { user } = useAuth();
  return (
    <Routes>
      <Switch>
        <Route path={["/:path?"]} exact>
          <Switch>
            <Layout>
              <Route
                exact
                path="/"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/iniciar-sesión"
                render={() => {
                  return user ? <Redirect to="/dashboard/home" /> : <Login />;
                }}
              />
              <Route
                exact
                path="/recuperar-contrasena"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <PasswordRecovery />
                  );
                }}
              />
              <Route
                exact
                path="/correo-enviado"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <SendEmail />
                  );
                }}
              />
              <Route
                exact
                path="/nueva-contrasena"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <NewPassword />
                  );
                }}
              />
              <Route
                exact
                path="/crear-cuenta"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <CreateAccount />
                  );
                }}
              />
            </Layout>
          </Switch>
        </Route>
        <Route path={["/dashboard/contratista/:path?"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/contratista/perfil"
                render={() => {
                  return user ? (
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
                  return user ? (
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
                  return user ? <ResumePay /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
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
                  return user ? (
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
                  return user ? (
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
                  return user ? <Jobs /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard/empresa/residentes"
                render={() => {
                  return user ? <Resident /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
            </Dashboard>
          </Switch>
        </Route>
        <Route path={["/dashboard/home"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/home"
                render={() => {
                  return user ? (
                    <Home />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user ? (
                    <Redirect to="/dashboard/home" />
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
