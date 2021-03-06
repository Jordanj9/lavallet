import { Vehiculo } from "../domain/vehiculo";
import { VehiculoDTO } from "../application/VehiculoDTO";
import { http } from "../../shared/infrastructure/http";

export const VehiculoRepository = {
  getAll: async () => {
    const response = await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/vehiculo");
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (vehiculoDto: VehiculoDTO): Vehiculo =>
              new Vehiculo().setVehiculoDTO(vehiculoDto)
          ),
          mensaje: response.mensaje,
          status: response.status,
          length: response.length
        }
      : response;
  },

  getPaginate: async (limit: number, offset: number) => {
    const response = await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/vehiculo?limit=" + limit + "&offset=" + offset);
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (vehiculoDto: VehiculoDTO): Vehiculo =>
              new Vehiculo().setVehiculoDTO(vehiculoDto)
          ),
          mensaje: response.mensaje,
          status: response.status,
          length: response.length
        }
      : response;
  },

  save: async (vehiculo: Vehiculo) => {
    return await http.post(
      "/api/vehiculo",
      new VehiculoDTO().setVehiculo(vehiculo)
    );
  },

  update: async (vehiculo: Vehiculo) => {
    return await http.put(
      "/api/vehiculo/" + vehiculo.id,
      new VehiculoDTO().setVehiculo(vehiculo)
    );
  },

  delete: async (id: string) => {
    return await http.delete("/api/vehiculo/" + id);
  }
};
