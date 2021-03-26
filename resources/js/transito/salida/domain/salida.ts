export type SalidaId = string;

export class Salida {
   id : SalidaId;
   tipo: string;
   /**
    *
    */
   constructor(clt:any) {
      if(typeof clt === 'string'){
         this.id = clt;
         this.tipo =  "";
      }
      else{         
         this.id = clt.id;
         this.tipo = clt.tipo;
      }
   }

}

