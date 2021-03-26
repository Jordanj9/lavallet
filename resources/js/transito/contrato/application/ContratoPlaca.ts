import { Cliente } from '../../cliente/domain/cliente';
import { ContratoLess } from './ContratoLess';
import { VehiculoPlaca } from './VehiculoPlaca';

export class ContratoPlaca extends ContratoLess {
    serie:string = "";
    cliente: Cliente = new Cliente();
    vehiculo: VehiculoPlaca = new VehiculoPlaca();    
}