import {Ticket} from "../domain/ticket";
import {TicketRepository} from "../infrastructure/ticket_repository";
import {generateUuid} from "../../shared/infrastructure/uuid";
import { SerieRepository } from "../../shared/infrastructure/serie_repository";
import { Serie } from "../../shared/domain/serie";

export default class TicketService {

  save = async (ticket: Ticket) => {
    ticket.id = ticket.id == "" ? generateUuid() : ticket.id;
    ticket.contrato.serie.id = generateUuid();
    ticket.detalle.id = "";
    return await TicketRepository.save(ticket);
  }

  getId = () => {
    return generateUuid();
  }
    
  getSerie = async (): Promise<{data:Serie, mensaje:string}> => {
    return await SerieRepository.get('TICKET');
  } 
  
}
