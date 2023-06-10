import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/components/confirmation-dialog/confirmation-dialog.component';
import { DetallesPedido } from 'src/app/interfaces/DetallesPedido';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {
  @Input() pedido!: Pedido;
  @Output() callDeleteOrder: EventEmitter<Pedido> = new EventEmitter<Pedido>();
  protected detallesPedido!: any[];

  constructor(private dialog: MatDialog, private RestService: RestService, private snackBar: MatSnackBar) { }

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

  openConfirmationDialog(): void {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { message: '¿Estás seguro de que quieres cancelar el pedido?' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El usuario confirmó la cancelación, realiza la acción necesaria
        this.callDeleteOrder.emit(this.pedido);
      }
    });
  }
}
