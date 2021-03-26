export type ClienteId = string;

export class Cliente {
   id : ClienteId = "";
   identificacion : string = "";
   nombre : string = "";
   telefono : string = "";
   tipo: string = "";
   departamento: string = "";
   municipio: string = "";
   direccion : string = "";
   correo : string = "";
   /**
    *
    */
   constructor(clt?:any) {
      if(clt != null){
         if(typeof clt === 'string'){
            this.id = clt;
            this.identificacion = clt;
            this.nombre =  "";
            this.telefono =  "";
            this.tipo =  "";
            this.departamento =  "";
            this.municipio =  "";
            this.direccion =  "";
            this.correo = "";
         }
         else{         
            this.id = clt.id;
            this.identificacion = clt.identificacion;
            this.nombre = clt.nombre;
            this.telefono = clt.telefono;
            this.tipo = clt.tipo;
            this.departamento = clt.departamento;
            this.municipio = clt.municipio;
            this.direccion = clt.direccion;
            this.correo = clt.correo;
         }
      }
   }

}

