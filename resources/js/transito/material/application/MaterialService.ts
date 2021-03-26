import {Material} from "../domain/material";
import {MaterialRepository} from "../infrastructure/material_repository";
import {generateUuid} from "../../shared/infrastructure/uuid";


export default class MaterialService {

  getMateriales = async (): Promise<{status:number, mensaje:string, data:Material[], length:number}> => {
    return await MaterialRepository.getAll();
  }

  getPaginate = async (limit:number, offset:number): Promise<{status:number, mensaje:string, data:Material[], length:number}> => {
    return await MaterialRepository.getPaginate(limit, offset);
  }

  save = async (material: Material) => {
    material.id = generateUuid();
    return await MaterialRepository.save(material);
  }

  update = async (material: Material) => {
    return await MaterialRepository.update(material);
  }

  delete = async (id: string) => {
    return await MaterialRepository.delete(id);
  }


}
