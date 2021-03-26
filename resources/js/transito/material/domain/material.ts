export class Material {
  id: string = "";
  nombre: string = "";
  vacio: boolean = this._vacio();
  
  constructor(material?:any){
    if(material != null){
      this.id = material.id;
      this.nombre = material.nombre;
    }
  }

  private _vacio():boolean {
    let vacio = false;
    vacio = this.id ? true : vacio;
    vacio = this.nombre ? true : vacio;
    return vacio;
  }

}
