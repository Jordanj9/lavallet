import { Detalle } from "../domain/detalle";
import { TerminoDTO } from "./TerminoDTO";

export class DetalleDTO {
    material:string = "";
    termino:TerminoDTO;
    transaccion:string = "";

    /**
     *
     */
    constructor(det:Detalle) {
        this.material = det.material.id;
        this.transaccion = det.transaccion;
        this.termino = det.termino;
    }
}