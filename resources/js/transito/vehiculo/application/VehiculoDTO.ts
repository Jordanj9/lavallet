import { Vehiculo } from "../domain/vehiculo";

export class VehiculoDTO {
  id: string = "";
  placa:string = "";
  tipo: string = "";
  capacidad: number = 0;
  conductor_id: string = "";
  conductor: string = "";

  setVehiculo(vehiculo:Vehiculo):VehiculoDTO{
    this.id= vehiculo.id;
    this.placa = vehiculo.placa;
    this.tipo = vehiculo.tipo;
    this.capacidad = parseInt(vehiculo.capacidad);
    this.conductor_id = vehiculo.conductor.id;
    return this;
  }
}
