export class Response {
    data:any;
    mensaje:string = "";

    constructor(data:any, mensaje:string) {
        this.data = data;
        this.mensaje = mensaje;
    }
};
