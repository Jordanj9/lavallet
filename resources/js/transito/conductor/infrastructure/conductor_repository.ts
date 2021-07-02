import { ConductorDTO } from "../application/ConductorDTO";
import { Conductor } from "../domain/conductor";
import { http } from "../../shared/infrastructure/http";

export const ConductorRepository = {
  getAll: async () => {
    const response = await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/conductor");
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (conductorDto: ConductorDTO): Conductor => ({
              id: conductorDto.id,
              identificacion: conductorDto.identificacion,
              nombre: conductorDto.nombre,
              telefono: conductorDto.telefono
            })
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
    }>("/api/conductor?limit=" + limit + "&offset=" + offset);
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (conductorDto: ConductorDTO): Conductor => ({
              id: conductorDto.id,
              identificacion: conductorDto.identificacion,
              nombre: conductorDto.nombre,
              telefono: conductorDto.telefono
            })
          ),
          mensaje: response.mensaje,
          status: response.status,
          length: response.length
        }
      : response;
  },

  get: async (id: string) => {
    return await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/conductor/" + id);
  },

  save: async (conductor: Conductor) => {
    return await http.post("/api/conductor", conductor);
  },

  update: async (conductor: Conductor) => {
    console.log(conductor);
    return await http.put("/api/conductor/" + conductor.id, conductor);
  },

  delete: async (id: string) => {
    return await http.delete("/api/conductor/" + id);
  }
};
