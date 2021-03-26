import { Cliente } from "../../cliente/domain/cliente";
import { VehiculoDTO } from "../../vehiculo/application/VehiculoDTO";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";
import { TicketDTO } from "./TicketDTO";
import { ValeDTO } from "./ValeDTO";


export class SalidaDTO {
  ticket:TicketDTO = new TicketDTO();
  vale:ValeDTO = new ValeDTO();
  vehiculo:Vehiculo = new Vehiculo();
  contrato_id:string = "";
  cliente:Cliente = new Cliente();
}
