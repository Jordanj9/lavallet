import { Cliente } from "../domain/cliente";
import { ClienteDTO } from "../application/ClienteDTO";
import { http } from "../../shared/infrastructure/http";

//server
import { PORT, SERVER } from '../../shared/config';

const URLBASE = `${SERVER}:${PORT}`;

export const ClienteRepository = {
   getAll: async () => {
      const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/cliente');
      response.data = response.data == "" ? [] : response.data;
      return response.data != null ? {
         data: response.data.map((clienteDto: ClienteDTO): Cliente => ({
         id: clienteDto.id,
         identificacion: clienteDto.identificacion,
         nombre: clienteDto.nombre,
         telefono: clienteDto.telefono,
         tipo: clienteDto.tipo,
         departamento: clienteDto.ubicacion.departamento,
         municipio: clienteDto.ubicacion.municipio,
         direccion: clienteDto.ubicacion.direccion,
         correo: clienteDto.correo
      })), mensaje: response.mensaje, status: response.status, length:response.length}: response;
   },

   getPaginate: async (limit:number, offset:number) => {
      const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/cliente?limit='+limit+'&offset='+offset);
      response.data = response.data == "" ? [] : response.data;
      return response.data != null ? {
         data: response.data.map((clienteDto: ClienteDTO): Cliente => ({
         id: clienteDto.id,
         identificacion: clienteDto.identificacion,
         nombre: clienteDto.nombre,
         telefono: clienteDto.telefono,
         tipo: clienteDto.tipo,
         departamento: clienteDto.ubicacion.departamento,
         municipio: clienteDto.ubicacion.municipio,
         direccion: clienteDto.ubicacion.direccion,
         correo: clienteDto.correo
      })), mensaje: response.mensaje, status: response.status, length: response.length}: response;
   },

   get: async (id:string) => {
      const response = await http.get<{status:number, mensaje:string, data:any, length:number}>(URLBASE + '/api/cliente/' + id);
      if(response.data == null)
         return response;
      const cliente = new Cliente();
      cliente.id = response.data?.id,
      cliente.identificacion = response.data?.identificacion,
      cliente.nombre = response.data?.nombre,
      cliente.telefono = response.data?.telefono,
      cliente.tipo = response.data?.tipo,
      cliente.departamento = response.data?.ubicacion.departamento,
      cliente.municipio = response.data?.ubicacion.municipio,
      cliente.direccion = response.data?.ubicacion.direccion,
      cliente.correo = response.data?.correo;
      return cliente;
   },

   save: async (cliente: Cliente) => {
      return await http.post(URLBASE + '/api/cliente', cliente);
   },

   update: async (cliente: Cliente) => {
      return await http.put(URLBASE + '/api/cliente/' + cliente.identificacion, cliente);
   },

   delete: async (id: string) => {
      return await http.delete(URLBASE + '/api/cliente/' + id);
   }
}


