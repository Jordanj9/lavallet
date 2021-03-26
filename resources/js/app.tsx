require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Contratacion from "./modules/contratacion";
import Generales from "./modules/generales";
import Reportes from './modules/reportes';
import Transito from "./modules/transito";
import Usuario from './modules/usuario';

const Root = () => {
  return (
    <Router>
      <div className='flex'>
        <Sidebar/>
        <div className='ml-auto w-10/12'>
          <Switch>
            <Route path='/usuario'>
              <Usuario/>
            </Route>
            <Route path='/contratacion'>
              <Contratacion/>
            </Route>
            <Route path='/generales'>
              <Generales/>
            </Route>
            <Route path='/transito'>
              <Transito/>
            </Route>
            <Route path='/reportes'>
              <Reportes/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

if (document.getElementById('root')) {
  ReactDOM.render(<Root/>, document.getElementById('root'));
}
