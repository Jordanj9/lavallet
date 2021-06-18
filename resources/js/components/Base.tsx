import React from "react";
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom";
import Sidebar from "./Sidebar";
import Contratacion from "../modules/contratacion";
import Generales from "../modules/generales";
import Reportes from "../modules/reportes";
import Transito from "../modules/transito";
import Usuario from "../modules/usuario";
import PrivateRoute from "./Lock";

function Base() {
    return (
        <div className="flex">
            <Sidebar/>
            <div className="ml-auto w-10/12">
                <Switch>
                    <PrivateRoute path="/dashboard/usuario" component={Usuario}></PrivateRoute>
                    <PrivateRoute path="/dashboard/contratacion" component={Contratacion}></PrivateRoute>
                    <PrivateRoute path="/dashboard/generales" component={Generales}></PrivateRoute>
                    <PrivateRoute path="/dashboard/transito" component={Transito}></PrivateRoute>
                    <PrivateRoute path="/dashboard/reportes" component={Reportes}></PrivateRoute>
                </Switch>
            </div>
        </div>
    );
}

export default Base;