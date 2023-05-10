export interface Libro {
    id?: string | null | number;
    titulo: string;
    saga: string;
    autor: string;
    isbn: string;
    fecha_publi: Date;
    id_genero: number;
    genero: string;
    id_editorial: number;
    editorial: string;
    descripcion: string;
    sinopsis: string;
    precio: number;
    tipo: string;
    portada: string;
    rating: number;
    stock: string;
    oferta?: string;
    cantidad: number;
    tapa?: string;
}
