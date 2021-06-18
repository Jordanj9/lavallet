import { http } from "../../shared/infrastructure/http";
import { Vale } from "../domain/vale";

import { ValeDTO } from "../application/ValeDTO";

export const ValeRepository = {
  save: async (vale: Vale) => {
    return await http.post("/api/vale", new ValeDTO().setVale(vale));
  }
};
