export interface Usuario {
    id:string|null;
    username:string;
    password:string;
    dni:string;
    nombre:string;
    apellidos:string;
    fecha_nac:Date;
    fecha_creacion:Date;
    pais:string|null;
    email:string;
    telefono:string|null;
    socio:Number;
    rol:string|null;
}
