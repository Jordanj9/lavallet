import React from "react";
import {Route,Switch} from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

import Header from "../components/Header";

const Usuario = () => {

    return (
      <React.Fragment>
        <div className='py-2 px-8'>
            <Header
                title='Usuario'
                description='Gestiona toda la información referente a usuarios.'
                tabs={[
                    {
                        'id': uuidv4(),
                        'title': 'Usuario',
                        'url': '/usuario/todos',
                        'active': true
                    }
                ]}
            />
              <Switch>
                <Route path='/usuario/todos'>
                  
                </Route>
              </Switch>
        </div>
      </React.Fragment>
    );
}

export default Usuario;
