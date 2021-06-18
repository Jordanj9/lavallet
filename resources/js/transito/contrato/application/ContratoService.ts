import { Contrato } from "../domain/contrato";
import { ContratoRepository } from "../infrastructure/contrato_repository";
import { generateUuid } from "../../shared/infrastructure/uuid";
import { Detalle } from "../domain/detalle";
import { ContratoFull } from "./ContratoFull";
import { SerieRepository } from "../../shared/infrastructure/serie_repository";
import { Serie } from "../../shared/domain/serie";

export default class ContratoService {

    getContratos = async (): Promise<{status:number, mensaje:string, data:Contrato[], length:number}> => {
        return await ContratoRepository.getAll();
    } 

    getPaginate = async (limit:number, offset:number): Promise<{status:number, mensaje:string, data:Contrato[], length:number}> => {
        return await ContratoRepository.getPaginate(limit, offset);
    } 
    
    getByPlaca = async (placa:string): Promise<{status:number, mensaje:string, data:Contrato[], length:number}> => {
        return await ContratoRepository.getByPlaca(placa);
    } 

    getDetalles = async (id:string): Promise<{status:number, mensaje:string, data:Detalle[], length:number}> => {
        return await ContratoRepository.getDetalles(id);
    } 
    
    getReport = async (id:string, desde:string, hasta:string): Promise<{data: ContratoFull, mensaje:string}> => {
        return await ContratoRepository.getReport(id, desde, hasta);
    }
    
    getDependencias = async (id:string): Promise<{data: ContratoFull, mensaje:string}> => {
        return await ContratoRepository.getDependencias(id);
    }
    
    getSerie = async (): Promise<{data:Serie, mensaje:string}> => {
        return await SerieRepository.get('CONTRATO');
    }

    save = async (Contrato: Contrato) => {
        Contrato.id = generateUuid();
        Contrato.fecha = new Date().toLocaleDateString();
        return await ContratoRepository.save(Contrato);
    }

    update = async (Contrato: Contrato) => {
        return await ContratoRepository.update(Contrato);
    }

}