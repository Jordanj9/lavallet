import { http } from "./http";

//server
import { PORT, SERVER } from '../config';

const URLBASE = `${SERVER}:${PORT}`;

export const SerieRepository = {

    get: async (tipo: string) => {
        return await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/serie/' + tipo);
    }
}