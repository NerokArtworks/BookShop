import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetallesPedido } from 'src/app/interfaces/DetallesPedido';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit{
  @Input() pedido!: Pedido;
  protected detallesPedido!: any[];

  constructor(private RestService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log(this.pedido);
    if (this.pedido.detallesPedidos != null) {
      this.pedido.detallesPedidos.forEach((detalle, index) => {
        this.RestService.getLibro(detalle.libro).subscribe(libro => { 
          (detalle.libro = libro);
          (this.compruebaTapa(detalle, libro));
        });
      });
    }
    // this.RestService.getDetallesPedido(this.pedido.id).subscribe(detallesPedido => { 
    //   (this.detallesPedido = detallesPedido);
    // });
  }

  compruebaTapa(detalle: DetallesPedido, libro: Libro) {
    if (detalle.importe > 30) {
      detalle.tapa = 'Tapa Dura';
    } else if(detalle.importe > 19 && libro.saga.startsWith('Nacidos De La Bruma')) {
      detalle.tapa = 'Tapa Dura';
    } else if (detalle.importe < 19 && detalle.importe >= 9.64) {
      detalle.tapa = 'Tapa Blanda';
    } else {
      detalle.tapa = 'eBook';
    }
  }
}
