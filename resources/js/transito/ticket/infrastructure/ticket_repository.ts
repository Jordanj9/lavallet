import {Ticket} from "../domain/ticket";
import {http} from "../../shared/infrastructure/http";

//server
import {PORT, SERVER} from '../../shared/config';
import { TicketDTO } from "../application/TicketDTO";

const URLBASE = `${SERVER}:${PORT}`;

export const TicketRepository = {

  save: async (ticket: Ticket) => {
    return await http.post(URLBASE + '/api/ticket', new TicketDTO().setTicket(ticket));
  }

}

