
import {ConductorRepository} from "../infrastructure/conductor_repository";
import {Conductor} from "../domain/conductor";
import {generateUuid} from "../../shared/infrastructure/uuid";

export default class ConductorService {

  getConductores = async () : Promise<{status:number, mensaje:string, data:Conductor[], length:number}> => {
    return await ConductorRepository.getAll();
  }

  getPaginate = async (limit:number, offset:number) : Promise<{status:number, mensaje:string, data:Conductor[], length:number}> => {
    return await ConductorRepository.getPaginate(limit, offset);
  }

  getConductor = async (id:string) : Promise<{status:number, mensaje:string, data:Conductor, length:number}> => {
    return await ConductorRepository.get(id);
  }

  save = async (conductor : Conductor) => {
    conductor.id =generateUuid();
    return await ConductorRepository.save(conductor);
  }

  update = async (conductor : Conductor) => {
    return await ConductorRepository.update(conductor);
  }

  delete = async (id : string) => {
    return await ConductorRepository.delete(id);
  }

}
