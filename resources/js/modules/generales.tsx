import React from "react";
import {Route,Switch} from 'react-router-dom';
import {v4 as uuidv4} from "uuid";

import Header from "../components/Header";
import ListMaterial from "../transito/material/views/list_material";
import ListConductor from "../transito/conductor/views/list_conductor";
import ListVehiculo from "../transito/vehiculo/views/list_vehiculo";

const Generales = () => {

  return (
    <div className='py-2 px-8'>
      <Header
        title='Generales'
        description='Gestiona toda la información referente a materiales, conductores y vehiculos'
        tabs={[
          {
            'id': uuidv4(),
            'title': 'Materiales',
            'url': '/generales/materiales',
            'active': true
          },
          {
            'id': uuidv4(),
            'title': 'Conductores',
            'url': '/generales/conductores',
            'active': false
          },
          {
            'id': uuidv4(),
            'title': 'Vehiculos',
            'url': '/generales/vehiculos',
            'active': false
          }
        ]}
      />
      <Switch>
        <Route path='/generales/materiales'>
       <ListMaterial/>
        </Route>
        <Route path='/generales/conductores'>
          <ListConductor/>
        </Route>
        <Route path='/generales/vehiculos'>
          <ListVehiculo/>
        </Route>
      </Switch>
    </div>
  );
}

export default Generales;
