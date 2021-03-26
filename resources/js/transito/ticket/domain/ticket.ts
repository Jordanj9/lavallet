import { Contrato } from "../../contrato/domain/contrato";
import { Detalle } from "../../contrato/domain/detalle";
import { Imprimible } from "../../salida/domain/imprimible";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";

export class Ticket extends Imprimible {
  constructor(
    id:string, 
    contrato:Contrato, 
    detalle:Detalle, 
    vehiculo:Vehiculo, 
    input:string, 
    output:string) {
      super();
      this.set(id, contrato, detalle, vehiculo, input, output);
      this.tipo = 'TICKET';
  }
}
