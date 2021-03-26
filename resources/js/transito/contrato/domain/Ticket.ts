import { Cliente } from "../../cliente/domain/cliente";
import { Imprimible } from "../../salida/domain/imprimible";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";
import { Contrato } from "./contrato";
import { Detalle } from "./detalle";

export class Ticket {
    id:string = "";
    placa:string = "";
    carga:number = 0;
    conductor: string = "";
    estado: string = "";
    material: string = "";
    input: string = "";
    output: string = "";
    serie:string = "";

    constructor(t:Ticket) {
        this.id = t.id;
        this.placa = t.placa;
        this.carga = t.carga;
        this.conductor = t.conductor;
        this.estado = t.estado;
        this.material = t.material;
        this.input = t.input;
        this.output = t.output;
        this.serie = t.serie;
    }

    getImprimible(cliente:Cliente):Imprimible{
        let imp = new Imprimible();
        imp.set(
            this.id,
            new Contrato(),
            new Detalle(),
            new Vehiculo(),
            this.input,
            this.output
        );
        let split = this.serie.split('-');
        imp.serie.actual = split[1];
        imp.serie.prefijo = split[0];

        imp.vehiculo.placa = this.placa;
        imp.vehiculo.conductor.nombre = this.conductor;

        imp.detalle.termino.volumen = ''+this.carga;
        imp.detalle.material.nombre = this.material;
        imp.detalle.transaccion = 'CARGUE';

        imp.estado = this.estado;
        imp.tipo = 'TICKET';
        imp.contrato.cliente = cliente;
        return imp;
    }
}