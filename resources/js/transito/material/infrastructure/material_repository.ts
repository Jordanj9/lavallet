import { Material } from "../domain/material";
import { MaterialDTO } from "../application/MaterialDTO";
import { http } from "../../shared/infrastructure/http";
import { MaterialReport } from "../application/MaterialReport";

export const MaterialRepository = {
  getAll: async () => {
    const response = await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/material");
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (materialDto: MaterialDTO): Material =>
              <Material>{
                id: materialDto.id,
                nombre: materialDto.nombre
              }
          ),
          mensaje: response.mensaje,
          status: response.status,
          length: response.length
        }
      : response;
  },

  getReport: async (inicio:string, final:string) => {
    const response = await http.get<{mensaje:string, data:any}>('/api/reporte/material/'+inicio+'/'+final);
    let materiales:Array<MaterialReport> = [];
    response.data = response.data == "" ? [] : response.data;
    for (const key in response.data) {
      let material:MaterialReport = {} as MaterialReport;
      material.nombre = key;
      material.total_volumen = response.data[key]['total_volumen'];
      material.total_carga_volumen = response.data[key]['total_carga_volumen'];
      material.viajes_cargas = response.data[key]['viajes_cargas'];
      material.total_descarga_volumen = response.data[key]['total_descarga_volumen'];
      material.viajes_descargas = response.data[key]['viajes_descargas'];
      materiales.push(material);
    }
    return response.data != null ? {
      data: materiales,
      mensaje: response.mensaje} : response;
  },

  getPaginate: async (limit: number, offset: number) => {
    const response = await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/material?limit=" + limit + "&offset=" + offset);
    response.data = response.data == "" ? [] : response.data;
    return response.data != null
      ? {
          data: response.data.map(
            (materialDto: MaterialDTO): Material =>
              <Material>{
                id: materialDto.id,
                nombre: materialDto.nombre
              }
          ),
          mensaje: response.mensaje,
          status: response.status,
          length: response.length
        }
      : response;
  },

  save: async (material: Material) => {
    return await http.post("/api/material", material);
  },

  update: async (material: Material) => {
    return await http.put("/api/material/" + material.id, material);
  },

  delete: async (id: string) => {
    return await http.delete("/api/material/" + id);
  }
};
