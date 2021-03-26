import {Vale} from "../domain/vale";
import {ValeRepository} from "../infrastructure/vale_repository";
import {generateUuid} from "../../shared/infrastructure/uuid";
import { SerieRepository } from "../../shared/infrastructure/serie_repository";
import { Serie } from "../../shared/domain/serie";


export default class ValeService {

  save = async (vale: Vale) => {
    vale.id = vale.id == "" ? generateUuid() : vale.id;
    vale.detalle.id = "";
    return await ValeRepository.save(vale);
  }

  getId = () => {
    return generateUuid();
  }
    
  getSerie = async (): Promise<{status:number, mensaje:string, data:Serie, length:number}> => {
    return await SerieRepository.get('VALET');
  }

}
