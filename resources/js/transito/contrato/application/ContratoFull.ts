import { Cliente } from '../../cliente/domain/cliente';
import { Vale } from '../domain/Vale';
import { VehiculoDTO } from '../../vehiculo/application/VehiculoDTO';
import { Detalle } from '../domain/detalle';
import { Serie } from '../../shared/domain/serie';
import { ContratoLess } from './ContratoLess';
import { Ticket } from '../domain/Ticket';

export class ContratoFull {
    contrato:ContratoLess = new ContratoLess();
    serie: Serie = new Serie();
    vehiculos: VehiculoDTO[] = [];
    detalles:Detalle[] = [];
    tickes:Ticket[] = [];
    vales:Vale[] = [];
    cliente:Cliente = new Cliente();
}