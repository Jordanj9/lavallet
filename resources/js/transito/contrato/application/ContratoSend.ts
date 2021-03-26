import { VehiculoDTO } from "./VehiculoDTO";
import { Contrato } from "../domain/contrato";
import { DetalleDTO } from "./DetalleDTO";

export class ContratoSend {
    id : string;
    cliente_id: string;
    ubicacion: {
        departamento: string;
        municipio: string;
        direccion: string;
    };
    serie: {
        id:string;
        prefijo:string;
        actual:string;
        tipo:string;
    };
    fecha : string;
    detalles : DetalleDTO[];
    vehiculos: VehiculoDTO[];

    constructor(ctt:Contrato){
        this.id = ctt.id;
        this.ubicacion = ctt.ubicacion;
        this.fecha = ctt.fecha;
        this.serie = ctt.serie;
        this.cliente_id = ctt.cliente.id;
        this.detalles = [];
        ctt.detalles.forEach(element => {
            this.detalles.push(new DetalleDTO(element));
        });
        this.vehiculos = [];
        ctt.vehiculos.forEach(element => {
            this.vehiculos.push(new VehiculoDTO(element));
        });
    }
}