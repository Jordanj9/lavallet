import {Departamento} from "../domain/departamento";
import {UbicacionRepository} from '../infrastructure/ubicacion_repository';

export default class UbicacionService {
  get = async (): Promise<{status:number, mensaje:string, data:Departamento[], length:number}> => {
    return await UbicacionRepository.get();
  }
}
