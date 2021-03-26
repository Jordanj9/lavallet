import { DetalleSend } from "../../contrato/application/DetalleSend";
import { Serie } from "../../shared/domain/serie";
import { Imprimible } from "../../salida/domain/imprimible";
import { Ticket } from "../domain/ticket";

export class TicketDTO {
  id: string = "";
  contrato_id: string = "";
  serie: Serie = new Serie();
  detalle: DetalleSend = new DetalleSend();
  vehiculo_id: string = "";
  input: string = "";
  output: string = "";

  setImprimible(imprimible:Imprimible):TicketDTO{
    this.id = imprimible.id;
    this.contrato_id = imprimible.contrato.id;
    this.serie = imprimible.contrato.serie;
    this.vehiculo_id = imprimible.vehiculo.id;
    this.input = imprimible.input;
    this.output = imprimible.output;
    this.detalle = new DetalleSend().setDetalle(imprimible.detalle);
    return this;
  }

  setTicket(ticket:Ticket):TicketDTO{
    this.id = ticket.id;
    this.contrato_id = ticket.contrato.id;
    this.serie = ticket.serie;
    this.vehiculo_id = ticket.vehiculo.id;
    this.input = ticket.input;
    this.output = ticket.output;
    this.detalle = new DetalleSend().setDetalle(ticket.detalle);
    return this;
  }
}
