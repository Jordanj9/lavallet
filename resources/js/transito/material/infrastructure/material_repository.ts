import {Material} from "../domain/material";
import {MaterialDTO} from "../application/MaterialDTO";
import {http} from "../../shared/infrastructure/http";

//server
import {PORT, SERVER} from '../../shared/config';

const URLBASE = `${SERVER}:${PORT}`;

export const MaterialRepository = {

  getAll: async () => {
    const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/material');    
    response.data = response.data == "" ? [] : response.data;
    return response.data != null ? {
      data: response.data.map((materialDto: MaterialDTO): Material => <Material>({
      id: materialDto.id,
      nombre: materialDto.nombre,
    })), mensaje: response.mensaje, status: response.status, length: response.length} : response;
  },

  getPaginate: async (limit:number, offset:number) => {
    const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/material?limit='+limit+'&offset='+offset);    
    response.data = response.data == "" ? [] : response.data;
    return response.data != null ? {
      data: response.data.map((materialDto: MaterialDTO): Material => <Material>({
      id: materialDto.id,
      nombre: materialDto.nombre,
    })), mensaje: response.mensaje, status: response.status, length: response.length} : response;
  },

  save: async (material: Material) => {
    return await http.post(URLBASE + '/api/material', material);
  },

  update: async (material: Material) => {
    return await http.put(URLBASE + '/api/material/' + material.id, material);
  },

  delete: async (id: string) => {
    return await http.delete(URLBASE + '/api/material/' + id);
  }
}

