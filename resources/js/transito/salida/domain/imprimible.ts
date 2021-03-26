import { TerminoDTO } from "../../contrato/application/TerminoDTO";
import { Contrato } from "../../contrato/domain/contrato";
import { Detalle } from "../../contrato/domain/detalle";
import { Serie } from "../../shared/domain/serie";
import { TicketDTO } from "../../ticket/application/TicketDTO";
import { Ticket } from "../../ticket/domain/ticket";
import { Vale } from "../../vale/domain/vale";
import { Vehiculo } from "../../vehiculo/domain/vehiculo";
import { SalidaDTO } from "../application/SalidaDTO";

export class Imprimible {
    id: string = "";
    contrato: Contrato = new Contrato();
    detalle: Detalle = new Detalle();
    vehiculo: Vehiculo = new Vehiculo();
    serie:Serie = new Serie();
    input: string = "";
    output: string = "";
    tipo: string = "";
    estado:string = "PENDIENTE";
    fecha:string = new Date().toLocaleString().replace(', ','T');
    //serie completo

    set(_id:string, _contrato:Contrato, _detalle:Detalle, _vehiculo:Vehiculo, _input:string, _output:string) {
        this.id = _id;
        this.contrato = _contrato;
        this.detalle = _detalle;
        this.vehiculo = _vehiculo;
        this.input = _input;
        this.output = _output;
    }

    setTicket(ticket:Ticket):Imprimible{
        this.id = ticket.id;
        this.contrato = ticket.contrato;
        this.detalle = ticket.detalle;
        this.vehiculo = ticket.vehiculo;
        this.input = ticket.input;
        this.output = ticket.output;
        this.tipo = 'TICKET';
        this.detalle.transaccion = 'CARGA';
        this.fecha = ticket.fecha;
        return this;
    }

    setVale(vale:Vale):Imprimible{
        this.id = vale.id;
        this.contrato = vale.contrato;
        this.detalle = vale.detalle;
        this.vehiculo = vale.vehiculo;
        this.input = vale.input;
        this.output = vale.output;
        this.tipo = 'VALE';        
        this.detalle.transaccion = 'DESCARGA';
        this.fecha = vale.fecha;
        return this;
    }

    setValeSalida(vale:any):Imprimible{
        this.id =  vale.id;
        this.contrato.id = vale.contrato_id;
        this.detalle.termino.volumen = vale.carga;
        this.detalle.material.nombre = vale.material;
        this.vehiculo.capacidad = vale.capacidad;
        this.vehiculo.placa = vale.placa;
        this.vehiculo.conductor.nombre = vale.conductor;
        this.input = vale.input;
        this.output = vale.output;
        this.tipo = 'VALE';        
        this.detalle.transaccion = vale.transaccion;
        this.fecha = new Date().toString();
        this.estado = vale.estado;
        this.serie.actual = vale.serie.split('-')[1];
        this.serie.prefijo = 'VALE';
        this.serie.tipo = 'VALE';
        this.fecha = vale.fecha || new Date().toLocaleString().replace(', ','T');
        return this;
    }
    

    setSalida(salida:SalidaDTO):Imprimible{
        if(salida.ticket.ticket != null){
            this.id = salida.ticket.ticket.id;
            this.contrato = new Contrato();
            this.detalle.material.nombre = salida.ticket.ticket.material;
            this.vehiculo = new Vehiculo().setVehiculo(salida.vehiculo);
            this.vehiculo.conductor.nombre = salida.ticket.ticket.conductor;
            this.input = salida.ticket.ticket.input;
            this.output = salida.ticket.ticket.output;
            this.tipo = salida.ticket.serie.tipo;
            this.detalle.termino = new TerminoDTO(salida.ticket.ticket.carga);
            this.estado = salida.ticket.ticket.estado;
            this.detalle.transaccion = 'CARGA';
            this.serie = salida.ticket.serie;
            this.contrato.id = salida.contrato_id;
            this.contrato.cliente = salida.cliente;
            this.fecha = salida.ticket.ticket.fecha;
            //this.contrato.cliente = salida.ticket;
        }
        else if(salida.vale.vale != null){            
            this.id = salida.vale.vale.id;
            this.contrato = new Contrato();
            this.detalle.material.nombre = salida.vale.vale.material;
            this.vehiculo = new Vehiculo().setVehiculo(salida.vehiculo);
            this.vehiculo.conductor.nombre = salida.vale.vale.conductor;
            this.input = salida.vale.vale.input;
            this.output = salida.vale.vale.output;
            this.tipo = salida.vale.serie.tipo;
            this.detalle.termino = new TerminoDTO(salida.vale.vale.carga);
            this.estado = salida.vale.vale.estado;
            this.detalle.transaccion = 'DESCARGA';
            this.serie = salida.vale.serie;
            this.contrato.id = salida.contrato_id;
            this.contrato.cliente = salida.cliente;
            this.fecha = salida.vale.vale.fecha;
        }
        else{
            this.vehiculo = new Vehiculo().setVehiculo(salida.vehiculo);
        }
        return this;
    }

}