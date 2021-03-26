import { Contrato } from "../../contrato/domain/contrato";
import { Detalle } from "../../contrato/domain/detalle";
import { Imprimible } from "../../salida/domain/imprimible";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";

export class Vale extends Imprimible {

  setValue(
    id:string, 
    contrato:Contrato, 
    detalle:Detalle, 
    vehiculo:Vehiculo, 
    input:string, 
    output:string) {
    this.set(id, contrato, detalle, vehiculo, input, output);
    this.tipo = 'VALE';
    return this;
  }

  setImprimible(imp:Imprimible):Vale{
    this.id = imp.id;
    this.contrato = imp.contrato;
    this.detalle = imp.detalle;
    this.vehiculo = imp.vehiculo;
    this.input = imp.input;
    this.output = imp.output;
    return this;
  }

}
