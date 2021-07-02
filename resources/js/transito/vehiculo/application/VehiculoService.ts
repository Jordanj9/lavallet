import { Vehiculo } from "../domain/vehiculo";
import { VehiculoRepository } from "../infrastructure/vehiculo_repository";
import { generateUuid } from "../../shared/infrastructure/uuid";

export default class VehiculoService {

  getVehiculos = async (): Promise<{status:number, data:Vehiculo[], mensaje:string, length:number}> => {
    return await VehiculoRepository.getAll();
  }  

  find = async (key:string): Promise<{status:number, mensaje:string, data:Vehiculo[], length:number}> => {
    //CAMBIAR POR RUTA DE BUSQUEDA POR ID
    return await VehiculoRepository.getAll();
  }

  getPaginate = async (limit:number, offset:number): Promise<{status:number, data:Vehiculo[], mensaje:string, length:number}> => {
    return await VehiculoRepository.getPaginate(limit, offset);
  }

  save = async (vehiculo: Vehiculo) => {
    vehiculo.id = generateUuid();
    return await VehiculoRepository.save(vehiculo);
  }

  update = async (vehiculo: Vehiculo) => {
    return await VehiculoRepository.update(vehiculo);
  }

  delete = async (id: string) => {
    return await VehiculoRepository.delete(id);
  }

}
