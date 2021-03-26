import { Detalle } from "../domain/detalle";

export class DetalleSend {
    id:string = "";
    material_id:string = "";
    transaccion:string = "";
    volumen:string = "";
    tipo:string = "";
    contrato_id:string = "";

    setDetalle(detalle:Detalle):DetalleSend{
        this.material_id = detalle.material.id;
        this.transaccion = detalle.transaccion;
        this.tipo = detalle.termino.tipo;
        this.volumen = ''+detalle.termino.volumen;
        this.id = detalle.id;
        this.contrato_id = detalle.contrato_id;
        return this;
    }

}