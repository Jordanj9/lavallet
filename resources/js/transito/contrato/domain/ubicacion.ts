export class Ubicacion {
    departamento: string = "";
    municipio: string = "";
    direccion: string = "";
    /**
     *
     */
    constructor(ubi?:any) {
        if(ubi != null){
            this.departamento = ubi.departamento;
            this.municipio = ubi.municipio;
            this.direccion = ubi.direccion;
        }
    }
};