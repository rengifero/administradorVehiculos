export default class Autos {
    $key=false;
    id: string;
    administrador: string;
    iglesia : string;
    marca : string;
    color: string;
    modelo: string;
    placas: string;
  }


  export class Vitacora {
    $key=false;
    autoId: string;
    descripcion: string;
    fecha : string;
    kilometraje : string;
    tipo: string;
    lugar: string;


    itemRows: {
      costo: number;
      descripcion: string;
      recomendacion: string;
    }
  }