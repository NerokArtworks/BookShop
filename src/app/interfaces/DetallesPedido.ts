export interface DetallesPedido {
    id?: string | null | number;
    cantidad: number;
    importe: number;
    libro: number | string;
    tapa?: string;
    pedido: number | string;
}
