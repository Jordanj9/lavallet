import { Cliente } from "../domain/cliente";
import { ClienteRepository } from "../infrastructure/cliente_repository";
import { generateUuid } from "../../shared/infrastructure/uuid";

export default class ClienteService {

  getClientes = async (): Promise<{status:number, mensaje:string, data:Cliente[], length:number}> => {
    return await ClienteRepository.getAll();
  }

  find = async (id:string): Promise<{status:number, mensaje:string, data:Cliente[], length:number}> => {
    //CAMBIAR POR RUTA DE BUSQUEDA POR ID
    return await ClienteRepository.getAll();
  }

  getPaginate = async (limit:number, offset:number): Promise<{status:number, mensaje:string, data:Cliente[], length:number}> => {
    return await ClienteRepository.getPaginate(limit, offset);
  }

  save = async (cliente: Cliente) => {
    cliente.id = generateUuid();
    return await ClienteRepository.save(cliente);
  }

  update = async (cliente: Cliente) => {
    return await ClienteRepository.update(cliente);
  }

  delete = async (id: string) => {
    return await ClienteRepository.delete(id);
  }

}
