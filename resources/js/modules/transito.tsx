import React from "react";
import { Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Header from "../components/Header";
import CrearSalida from "../transito/salida/views/crear_salida";
import CrearEntrada from "../transito/entrada/views/crear_entrada";

const Transito = () => {
  return (
    <React.Fragment>
      <div className="py-2 px-8">
        <Header
          title="Transito"
          description="Gestiona toda la información referente a transito y vehiculos."
          tabs={[
            {
              id: uuidv4(),
              title: "Entrada",
              url: "/dashboard/transito/entrada",
              active: true
            },
            {
              id: uuidv4(),
              title: "Salida",
              url: "/dashboard/transito/salida",
              active: false
            }
          ]}
        />
        <Switch>
          <Route path="/dashboard/transito/entrada">
            <CrearEntrada />
          </Route>
          <Route path="/dashboard/transito/salida">
            <CrearSalida />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Transito;
