import { Serie } from "../../shared/domain/serie";
import { Vale } from "../domain/Vale";

export class ValeDTO {
    vale:Vale  = new Vale();
    serie:Serie = new Serie();
}
