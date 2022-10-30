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
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/iniciar-sesión"
                render={() => {
                  return user && user.role === 'admin' ? <Redirect to="/dashboard/home" /> : <Login />;
                }}
              />
              <Route
                exact
                path="/recuperar-contrasena"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
                  ) : (
                    <PasswordRecovery />
                  );
                }}
              />
              <Route
                exact
                path="/correo-enviado"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
                  ) : (
                    <SendEmail />
                  );
                }}
              />
              <Route
                exact
                path="/nueva-contrasena"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
                  ) : (
                    <NewPassword />
                  );
                }}
              />
              <Route
                exact
                path="/crear-cuenta"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/home" />
                  ) : (
                    <CreateAccount />
                  );
                }}
              />
              <Route
                exact
                path="/*"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <NotFound />
                  ) : (
                    <CreateAccount />
                  );
                }}
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
                  return user && user.role === 'checker' ? (
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
                path="/dashboard/perfil"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <EngeinerProfile />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/perfil" />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
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
                  return user && user.role === 'admin' ? (
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
                  return user && user.role === 'admin' ? (
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
                  return user && user.role === 'admin' ? <ResumePay /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
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
                  return user && user.role === 'admin' ? (
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
                  return user && user.role === 'admin' ? (
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
                  return user && user.role === 'admin' ? <Jobs /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard/empresa/residentes"
                render={() => {
                  return user && user.role === 'admin' ? <Resident /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard"
                render={() => {
                  return user && user.role === 'admin' ? (
                    <Redirect to="/dashboard/profile" />
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
