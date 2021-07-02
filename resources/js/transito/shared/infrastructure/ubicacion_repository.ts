import { http } from "./http";

export const UbicacionRepository = {
  get: async () => {
    return await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/departamento");
  }
};
