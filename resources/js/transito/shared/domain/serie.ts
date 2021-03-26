export class Serie {
    id:string = "";
    prefijo:string = "";
    actual:string = "";
    tipo:string = "";
    /**
     *
     */
    constructor(ser?:any) {
        if(ser != null){
            this.id = ser.id;
            this.prefijo = ser.prefijo;
            this.actual = ser.actual;
            this.tipo = ser.tipo;
        }
    }
}