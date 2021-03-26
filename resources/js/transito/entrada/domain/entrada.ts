export type ClienteId = string;

export class Cliente {
   id : ClienteId;
   identificacion : string;
   nombre : string;
   telefono : string;
   tipo: string;
   departamento: string;
   municipio: string;
   direccion : string;
   /**
    *
    */
   constructor(clt:any) {
      if(typeof clt === 'string'){
         this.id = clt;
         this.identificacion = clt;
         this.nombre =  "";
         this.telefono =  "";
         this.tipo =  "";
         this.departamento =  "";
         this.municipio =  "";
         this.direccion =  "";
      }
      else{         
         this.id = clt.id;
         this.identificacion = clt.id;
         this.nombre = clt.nombre;
         this.telefono = clt.telefono;
         this.tipo = clt.tipo;
         this.departamento = clt.departamento;
         this.municipio = clt.municipio;
         this.direccion = clt.direccion;
      }
   }

}

