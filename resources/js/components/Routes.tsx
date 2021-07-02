import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Contratacion from "../modules/contratacion";
import Generales from "../modules/generales";
import Reportes from "../modules/reportes";
import Transito from "../modules/transito";
import Usuario from "../modules/usuario";
import Login from "../pages/login";
import PrivateRoute from "./Lock";
import Base from "./Base";

function Routes() {
  return (
    <Router>
      <Route
        exact
        path="/"
        render={() =>
          <Redirect to="/dashboard" />
        }
      />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/dashboard" component={Base}/>
    </Router>
  );
}

export default Routes;
