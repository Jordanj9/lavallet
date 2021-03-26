import React from "react";
import {Route,Switch} from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

import Header from "../components/Header";

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
                  
                </Route>
                <Route path='/reportes/materiales'>
                  
                </Route>
              </Switch>
        </div>
      </React.Fragment>
    );
}

export default Reportes;
