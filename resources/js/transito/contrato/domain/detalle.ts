import { Material } from "../../material/domain/material";
import { DetalleDTO } from "../application/DetalleDTO";
import { TerminoDTO } from "../application/TerminoDTO";

export class Detalle {
    id:string = "";
    material:Material = new Material();
    termino:TerminoDTO = new TerminoDTO('0');
    transaccion:string = "";
    contrato_id:string = "";
    /**
     *
     */
    constructor(det?:DetalleDTO) {
        if(det != null){
            this.material = new Material();
            this.material.id = det.material;
            this.transaccion = det.transaccion;
            this.termino.volumen = det.termino.volumen;
            this.termino.tipo = det.termino.tipo;
        }
    }
};