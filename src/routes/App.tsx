import React from "react";
import { BrowserRouter as Routes, Route, Switch, Redirect } from "react-router-dom";
import Login from "@pages/Login";
import PasswordRecovery from "@pages/PasswordRecovery";
import SendEmail from "@pages/SendEmail";
import NewPassword from "@pages/NewPassword";
import CreateAccount from "@pages/CreateAccount";
import Employees from "@pages/Employees";
import Contractor from "@pages/Contractor";
import ListPay from "@pages/ListPay";
import Home from "@pages/Home";
import Layout from "@containers/Layout";
import Dashboard from "@containers/Dashboard/Dashboard";
import NotFound from "@pages/NotFound";
import { useAuth } from '@redux/Auth';

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
        <Route path={["/dashboard/:path?"]} exact>
          <Switch>
            <Dashboard>
              <Route
                exact
                path="/dashboard/home"
                render={() => {
                  return user ? <Home /> : <Redirect to="/iniciar-sesión" />;
                }}
              />
              <Route
                exact
                path="/dashboard/contratistas"
                render={() => {
                  return user ? (
                    <Contractor />
                  ) : (
                    <Redirect to="/iniciar-sesión" />
                  );
                }}
              />
              <Route
                exact
                path="/dashboard/trabajadores"
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
                path="/dashboard/resumen-de-pagos"
                render={() => {
                  return user ? <ListPay /> : <Redirect to="/iniciar-sesión" />;
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
