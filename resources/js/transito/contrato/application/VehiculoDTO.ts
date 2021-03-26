import { Vehiculo } from "../../vehiculo/domain/vehiculo";

export class VehiculoDTO {
    id:string = "";
    
    constructor(veh:Vehiculo) {
        this.id = veh.id
    }
}