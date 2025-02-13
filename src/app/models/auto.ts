export interface Auto {

     User: string  
    $autoId?: string;
    descripcion?: string;
    fecha?: Date;
    kilometraje?: string;
    lugar?: string;
    type?: number;
    itemRows:Records[] 
}

export interface Records{
costo?:number
descripcion?:string
recomendacion?:string


}
