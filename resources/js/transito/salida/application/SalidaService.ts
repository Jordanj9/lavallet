import { Vale } from "../../vale/domain/vale";
import { SalidaDTO } from "./SalidaDTO";
import { TicketDTO } from "../../ticket/application/TicketDTO";
import { SalidaRepository } from "../infrastructure/salida_repository";

export default class SalidaService {    
    getByPlaca = async (placa:string): Promise<{status:number, mensaje:string, data:SalidaDTO, length:number}> => {
        return await SalidaRepository.getByPlaca(placa);
    }

    closeTicket = async (ticket:TicketDTO): Promise<{data:Vale, mensaje:string}> => {
        return await SalidaRepository.closeTicket(ticket);
    }

    closeVale = async (vale:Vale): Promise<{data:Vale, mensaje:string}> => {
        return await SalidaRepository.closeVale(vale);
    } 
}
