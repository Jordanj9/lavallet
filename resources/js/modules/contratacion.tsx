import React from "react";
import { Route, Switch } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import Header from "../components/Header";
import ListClientes from "../transito/cliente/views/list_cliente";
import CrearContratos from "../transito/contrato/views/crear_contrato";
import ListarContratos from "../transito/contrato/views/list_contrato";

const Contratacion = () => {
  return (
    <React.Fragment>
      <div className="py-2 px-8">
        <Header
          title="Contratación"
          description="Gestiona toda la información referente a contratos y clientes."
          tabs={[
            {
              id: uuidv4(),
              title: "Contrato",
              url: "/dashboard/contratacion/contrato",
              active: true
            },
            {
              id: uuidv4(),
              title: "Cliente",
              url: "/dashboard/contratacion/cliente",
              active: false
            },
            {
              id: uuidv4(),
              title: "Lista de contratos",
              url: "/dashboard/contratacion/listcontratos",
              active: false
            }
          ]}
        />
        <Switch>
          <Route path="/dashboard/contratacion/contrato">
            <CrearContratos />
          </Route>
          <Route path="/dashboard/contratacion/cliente">
            <ListClientes />
          </Route>
          <Route path="/dashboard/contratacion/listcontratos">
            <ListarContratos />
          </Route>
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Contratacion;
