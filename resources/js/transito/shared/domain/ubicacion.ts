import { Departamento } from "./departamento";
import { Municipio } from "./municipio";

export class Ubicacion {
    departamento:string = "";
    municipio:string = "";
    direccion:string = "";

    setValueObjects(departamento:Departamento, municipio:Municipio, direccion:string){
        this.departamento =  departamento.nombre;
        this.municipio = municipio.nombre;
        this.direccion = direccion;
    }

    setValueString(departamento:string, municipio:string, direccion:string){
        this.departamento =  departamento;
        this.municipio = municipio;
        this.direccion = direccion;
    }
};