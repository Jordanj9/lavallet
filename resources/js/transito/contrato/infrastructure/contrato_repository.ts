import { Contrato } from "../domain/contrato";
import { ContratoSend } from "../application/ContratoSend";
import { ContratoUpdate } from "../application/ContratoUpdate";
import { http } from "../../shared/infrastructure/http";

//server
import { PORT, SERVER } from '../../shared/config';
import { Detalle } from "../domain/detalle";
import { ContratoFetch } from "../application/ContratoFetch";
import { ContratoPlaca } from "../application/ContratoPlaca";
import { ContratoFull } from "../application/ContratoFull";

const URLBASE = `${SERVER}:${PORT}`;

export const ContratoRepository = {

    getAll: async () => {
        const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/contrato');
        response.data = response.data == "" ? [] : response.data;
        return response.data != null ? 
        {
            data: response.data?.map((contratoDto : ContratoFetch) : Contrato => (new Contrato().setContratoFetch(contratoDto))),
            mensaje: response.mensaje,
            status: response.status,
            length: response.length
        } : response;
    },

    getPaginate: async (limit:number, offset:number) => {
        const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/contrato?limit='+limit+'&offset='+offset);
        response.data = response.data == "" ? [] : response.data;
        return response.data != null ? 
        {
            data: response.data?.map((contratoDto : ContratoFetch) : Contrato => (new Contrato().setContratoFetch(contratoDto))),
            mensaje: response.mensaje,
            status: response.status,
            length: response.length
        } : response;
    },

    getByPlaca: async (placa:string) => {
        const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/contrato/' + placa);
        return response.data != null ? {
            data: response.data.map((contratoDto : ContratoPlaca) : Contrato => (new Contrato().setContratoPlaca(contratoDto))),
            mensaje: response.mensaje,
            status: response.status,
            length: response.length
        } : response;
    },
    
    getDetalles: async (id:string) => {
        return await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/contrato/detalles/' + id);
    },
    
    getDependencias: async (id:string) => {
        return await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/contrato/get/dependencias/' + id);
    },

    save: async (Contrato: Contrato) => {
        return await http.post(URLBASE + '/api/contrato', new ContratoSend(Contrato));
    },

    update: async (Contrato: Contrato) => {
        return await http.put(URLBASE + '/api/contrato/' + Contrato.id, new ContratoUpdate(Contrato));
    }
}