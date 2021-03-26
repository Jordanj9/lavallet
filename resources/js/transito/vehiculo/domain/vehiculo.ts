import { Conductor } from "../../conductor/domain/conductor";
import { VehiculoPlaca } from "../../contrato/application/VehiculoPlaca";
import { VehiculoDTO } from "../application/VehiculoDTO";

export class Vehiculo {
    id: string = "";
    placa:string = "";
    capacidad:string = "";
    tipo:string = "";
    conductor: Conductor = new Conductor();

    setVehiculo(vehiculo:Vehiculo):Vehiculo{
        this.id = vehiculo.id;
        this.placa = vehiculo.placa;
        this.capacidad = vehiculo.capacidad;
        this.tipo = vehiculo.tipo;
        this.conductor = vehiculo.conductor;
        return this;
    }

    setVehiculoDTO(vehiculo:VehiculoDTO):Vehiculo{
        this.id = vehiculo.id;
        this.placa = vehiculo.placa;
        this.capacidad = ''+vehiculo.capacidad;
        this.tipo = vehiculo.tipo;
        this.conductor.id = vehiculo.conductor_id;
        this.conductor.nombre = vehiculo.conductor;
        return this;
    }

    setVehiculoPlaca(vehiculo:VehiculoPlaca):Vehiculo{
        this.id = vehiculo.id;
        this.placa = vehiculo.placa;
        this.capacidad = ''+vehiculo.capacidad;
        this.tipo = vehiculo.tipo;
        this.conductor.id = vehiculo.conductor_id;
        this.conductor = vehiculo.conductor;
        return this;
    }

    setId(id:string):Vehiculo{
        this.id = id;
        this.placa = '';
        this.capacidad = '';
        this.tipo = '';
        this.conductor = new Conductor();
        return this;
    }
}