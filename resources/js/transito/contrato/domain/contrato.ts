import { Cliente } from '../../cliente/domain/cliente';
import { Vehiculo } from '../../vehiculo/domain/vehiculo';
import { ContratoFetch } from '../application/ContratoFetch';
import { Detalle } from './detalle';
import { Serie } from '../../shared/domain/serie';
import { Ubicacion } from './ubicacion';
import { ContratoPlaca } from '../application/ContratoPlaca';

export class Contrato {
    id : string = "";
    ubicacion: Ubicacion = new Ubicacion();
    detalles: Detalle[] = [];
    fecha : string = "";
    serie: Serie = new Serie();
    cliente: Cliente = new Cliente();
    vehiculos: Vehiculo[] = [];

    setContrato(ctt:Contrato):Contrato{
        this.id = ctt.id;
        this.ubicacion = ctt.ubicacion;
        this.cliente = ctt.cliente;
        this.fecha = ctt.fecha;
        this.serie = ctt.serie;
        this.vehiculos = ctt.vehiculos;
        this.cliente = ctt.cliente;
        return this;
    }

    setContratoFetch(ctt:ContratoFetch):Contrato{
        this.id = ctt.contrato.id;
        this.ubicacion.departamento = ctt.contrato.departamento;
        this.ubicacion.municipio = ctt.contrato.municipio;
        this.ubicacion.direccion = ctt.contrato.direccion;
        this.cliente = ctt.cliente;
        this.fecha = ctt.contrato.fecha;
        this.serie.actual = ctt.contrato.serie_actual;
        this.serie.id = ctt.contrato.serie_id;
        this.serie.prefijo = ctt.contrato.serie_prefijo;
        return this;
    }

    setContratoPlaca(ctt:ContratoPlaca):Contrato{
        this.id = ctt.id;
        this.ubicacion.departamento = ctt.departamento;
        this.ubicacion.municipio = ctt.municipio;
        this.ubicacion.direccion = ctt.direccion;
        this.cliente = ctt.cliente;
        this.fecha = ctt.fecha;

        let split = ctt.serie.split('-');
        this.serie.actual = split[1];
        this.serie.prefijo = split[0];
        this.serie.tipo = 'CONTRATO';

        this.vehiculos = [];
        this.vehiculos.push(new Vehiculo().setVehiculoPlaca(ctt.vehiculo));

        return this;
    }
}