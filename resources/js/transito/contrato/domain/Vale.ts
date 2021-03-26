import { Cliente } from "../../cliente/domain/cliente";
import { Imprimible } from "../../salida/domain/imprimible";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";
import { Contrato } from "./contrato";
import { Detalle } from "./detalle";

export class Vale {
    id:string = "";
    identificacion:string = "";
    placa:string = "";
    capacidad:number = 0;
    carga:any[] = [];
    conductor: string = "";
    estado: string = "";
    material: string = "";
    vehiculo_id: string = "";
    input: string = "";
    output: string = "";
    serie:string = "";
    transaccion:string = "";
    
    constructor(t:Vale) {
        this.id = t.id;
        this.placa = t.placa;
        this.carga = t.carga;
        this.conductor = t.conductor;
        this.estado = t.estado;
        this.material = t.material;
        this.input = t.input;
        this.output = t.output;
        this.serie = t.serie;
        this.transaccion = t.transaccion;
        this.vehiculo_id = t.vehiculo_id;
        this.carga = t.carga;
        this.identificacion = t.identificacion;
        this.capacidad = t.capacidad;
    }

    getImprimible(cliente:Cliente):Imprimible{
        let imp = new Imprimible();
        imp.set(
            this.identificacion,
            new Contrato(),
            new Detalle(),
            new Vehiculo(),
            this.input,
            this.output
        );
        let split = this.serie.split('-');
        imp.serie.actual = split[1];
        imp.serie.prefijo = split[0];
        
        imp.vehiculo.id = this.vehiculo_id;
        imp.vehiculo.placa = this.placa;
        imp.vehiculo.conductor.nombre = this.conductor;

        imp.detalle.termino.volumen = ''+this.capacidad;
        imp.detalle.material.nombre = this.material;
        imp.detalle.transaccion = this.transaccion;

        imp.contrato.cliente = cliente;
        imp.estado = this.estado;
        imp.tipo = 'VALE';
        return imp;
    }
}