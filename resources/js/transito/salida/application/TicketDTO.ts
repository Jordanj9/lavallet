import { Serie } from "../../shared/domain/serie";
import { Ticket } from "../domain/Ticket";


export class TicketDTO {
    ticket:Ticket = new Ticket();
    serie:Serie = new Serie();
}
