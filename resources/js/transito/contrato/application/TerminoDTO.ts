export class TerminoDTO {
    volumen:string = "";
    tipo:string = "";
    /**
     *
     */
    constructor(vol:string) {
        this.volumen = vol;
        this.tipo = vol != "99999" ? "DEFINIDO" : "INDEFINIDO";
    }
}