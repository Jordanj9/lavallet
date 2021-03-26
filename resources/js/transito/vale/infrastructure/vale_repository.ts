import {http} from "../../shared/infrastructure/http";
import {Vale} from "../domain/vale";

//server
import {PORT, SERVER} from '../../shared/config';
import { ValeDTO } from "../application/ValeDTO";

const URLBASE = `${SERVER}:${PORT}`;

export const ValeRepository = {

  save: async (vale: Vale) => {
    return await http.post(URLBASE + '/api/vale', new ValeDTO().setVale(vale));
  }

}

