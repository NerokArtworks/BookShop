export interface Pedido {
    id?: string | null | number;
    id_usuario: string | null;
    id_libro: string | null;
    username: string | null;
    titulo: string | null;
    autor: string | null;
    editorial: string | null;
    genero: string | null;
    fecha: Date | null;
}
