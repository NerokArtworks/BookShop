import { Descuento } from "./Descuento";
import { Usuario } from "./Usuario";

export interface Pedido {
    id?: string | null | number;
    fecha: Date;
    importe: number;
    detallesPedidos: any[] | null;
    descuento: Descuento | string | number | null;
    usuario: Usuario;
    tracking?: number;
    result: string|null;
}
