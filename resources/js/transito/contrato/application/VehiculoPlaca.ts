import { Conductor } from "../../conductor/domain/conductor";

export class VehiculoPlaca {
   id: string = "";
   placa:string = "";
   tipo: string = "";
   capacidad: number = 0;
   conductor_id: string = "";
   conductor: Conductor = new Conductor();
}