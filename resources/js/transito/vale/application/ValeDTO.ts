import { DetalleSend } from "../../contrato/application/DetalleSend";
import { Serie } from "../../shared/domain/serie";
import { Imprimible } from "../../salida/domain/imprimible";
import { Vale } from "../domain/vale";

export class ValeDTO {
  id: string = "";
  contrato_id: string = "";
  serie: Serie = new Serie();
  detalle: DetalleSend = new DetalleSend();
  vehiculo_id: string = "";
  input: string = "";
  output: string = "";

  setImprimible(imprimible:Imprimible):ValeDTO{
    this.id = imprimible.id;
    this.contrato_id = imprimible.contrato.id;
    this.serie = imprimible.contrato.serie;
    this.vehiculo_id = imprimible.vehiculo.id;
    this.input = imprimible.input;
    this.output = imprimible.output;
    this.detalle = new DetalleSend().setDetalle(imprimible.detalle);
    return this;
  }

  setVale(vale:Vale):ValeDTO{
    this.id = vale.id;
    this.contrato_id = vale.contrato.id;
    this.serie = vale.serie;
    this.vehiculo_id = vale.vehiculo.id;
    this.input = vale.input;
    this.output = vale.output;
    this.detalle = new DetalleSend().setDetalle(vale.detalle);
    return this;
  }
}
