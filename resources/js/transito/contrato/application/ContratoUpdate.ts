import { Contrato } from "../domain/contrato";
import { DetalleDTO } from "./DetalleDTO";

export class ContratoUpdate {
    id : string;
    detalles : DetalleDTO[];
    vehiculos: {id:string}[];

    constructor(ctt:Contrato){
        this.id = ctt.id;
        this.detalles = [];
        ctt.detalles.forEach(element => {
            this.detalles.push(new DetalleDTO(element));
        });
        this.vehiculos = [];
        ctt.vehiculos.forEach(element => {
            this.vehiculos.push({id: element.id});
        });
    }
}