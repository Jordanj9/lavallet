import { http } from "./http";

export const SerieRepository = {
  get: async (tipo: string) => {
    return await http.get<{
      status: number;
      mensaje: string;
      data: any;
      length: number;
    }>("/api/serie/" + tipo);
  }
};

