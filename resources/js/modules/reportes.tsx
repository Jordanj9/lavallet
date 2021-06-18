import React from "react";
import {Route,Switch} from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

import Header from "../components/Header";
import ReportContratos from "../transito/contrato/views/report_contrato";
import ListMaterialReport from "../transito/material/views/list_material_report";

const Reportes = () => {

    return (
      <React.Fragment>
        <div className='py-2 px-8'>
            <Header
                title='Reportes'
                description='Visualiza la información de tu empresa.'
                tabs={[
                    {
                      'id': uuidv4(),
                      'title': 'Contratos',
                      'url': '/reportes/contratos',
                      'active': false
                    },
                    {
                      'id': uuidv4(),
                      'title': 'Materiales',
                      'url': '/reportes/materiales',
                      'active': true
                    }
                ]}
            />
              <Switch>
                <Route path='/reportes/contratos'>
                  <ReportContratos></ReportContratos>
                </Route>
                <Route path='/reportes/materiales'>
                  <ListMaterialReport></ListMaterialReport>
                </Route>
              </Switch>
        </div>
      </React.Fragment>
    );
}

export default Reportes;
