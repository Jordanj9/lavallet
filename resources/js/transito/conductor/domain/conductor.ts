export type ConductorId = string;


export class Conductor {
  id: ConductorId = "";
  identificacion: string = "";
  nombre: string = "";
  telefono:string = "";
  /**
   *
   */
  constructor(con?:any) {
    if(con != null){
      if(typeof con === 'string'){
        this.id = con;
        this.identificacion = "";
        this.nombre  = "";
        this.telefono = "";
      }
      else{
        this.id = con.id;
        this.identificacion = con.identificacion;
        this.nombre  = con.nombre;
        this.telefono = con.telefono;
      }
    }
  }
}
