import { Ticket } from "../domain/ticket";
import { http } from "../../shared/infrastructure/http";

import { TicketDTO } from "../application/TicketDTO";

export const TicketRepository = {
  save: async (ticket: Ticket) => {
    return await http.post("/api/ticket", new TicketDTO().setTicket(ticket));
  }
};
