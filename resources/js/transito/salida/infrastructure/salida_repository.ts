import { http } from "../../shared/infrastructure/http";

//server
import { PORT, SERVER } from "../../shared/config";
import { TicketDTO } from "../../ticket/application/TicketDTO";
import { Vale } from "../../vale/domain/vale";

export const SalidaRepository = {
  getByPlaca: async (placa: string) => {
    return await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/vehiculo/validar/salida/" + placa);
  },

  closeTicket: async (ticket: TicketDTO) => {
    return await http.put("/api/ticket/" + ticket.id, ticket);
  },

  closeVale: async (vale: Vale) => {
    return await http.put("/api/vale/" + vale.id, vale);
  }
};
