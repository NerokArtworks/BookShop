import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
      transition(':enter', [animate('300ms 300ms', style({ opacity: 1 }))]),
    ]),
  ]
})
export class ProfileComponent implements OnInit{
  protected pedidos!: Pedido[];
  protected pedido!: Pedido;
  protected libros!: Libro[];
  protected libro!: Libro;
  protected usuario!: Usuario;
  protected usuarios!: Usuario[];
  protected currentTab: number | string = 1;
  protected hideTab: boolean = false;

  constructor(private RestService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      console.log("Usuario logueado");
      this.RestService.getUserByJWT(token).subscribe(usuario => {
        (this.usuario = usuario);

        this.RestService.getPedidosByUser(usuario.id).subscribe(pedido => { 
          (this.pedidos = pedido);
          (console.log(pedido[0].detallesPedidos));
        });
      })
    }
    
    this.RestService.getLibros().subscribe(libro => {
      (this.libros = libro);
    });
  }

  loadTab(id: number | string) {
    this.currentTab = id;
    if (this.libro) {
      this.hideTab = true;
    }
    console.log(`Cambiado al tab: ${id}`);
  }

  esLibro(param: any): param is Libro {
    return param instanceof Object;
  }
  
  showOrderView(item: any) {
    this.currentTab = 'showOrder';
    this.pedido = item;
  }

  showEditUserView(item: any) {
    this.currentTab = 'showEditInfo';
    this.usuario = item;
  }

  deleteOrder(pedido: Pedido) {
    console.log("Delete order Profile");
    let index = this.pedidos.indexOf(pedido);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      this.RestService.deletePedido(pedido.id).subscribe();
      // Borro el pedido y vuelvo a la lista de pedidos
      this.currentTab = '2';
      this.showSuccessAlert();
      console.log("ID del pedido a borrar: ",  pedido.id);
    }
  }

  

  showSuccessAlert() {
    this.snackBar.open('Pedido cancelado con éxito', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }
}
