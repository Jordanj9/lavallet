import {http} from "./http";
import {Departamento} from '../domain/departamento';

//server
import {PORT, SERVER} from '../config';

const URLBASE = `${SERVER}:${PORT}`;

export const UbicacionRepository = {
  get: async () => {
    return await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/departamento');
  }
}

