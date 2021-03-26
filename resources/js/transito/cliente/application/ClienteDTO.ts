export interface ClienteDTO {
  id : string;
  identificacion : string;
  nombre : string;
  telefono : string;
  tipo: string;
  ubicacion: {
    departamento: string;
    municipio: string;
    direccion: string;
  };
  correo: string;
}
