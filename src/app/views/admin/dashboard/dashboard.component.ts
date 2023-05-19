import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 0 })),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
      transition(':enter', [animate('300ms 300ms', style({ opacity: 1 }))]),
    ]),
  ]
})
export class DashboardComponent implements OnInit{
  protected pedidos!: Pedido[];
  protected pedido!: Pedido;
  protected libros!: Libro[];
  protected libro!: Libro;
  protected usuarios!: Usuario[];
  protected currentTab: number | string = 1;
  protected hideTab: boolean = false;

  constructor(private RestService: RestService) { }

  ngOnInit(): void {
    this.RestService.getPedidos().subscribe(pedido => { 
      (this.pedidos = pedido);
      (console.log(pedido[0].detallesPedidos));
    });

    this.RestService.getUsers().subscribe(user => {
      (this.usuarios = user);
    });
    
    this.RestService.getLibros().subscribe(libro => {
      (this.libros = libro);
    });
  }

  loadTab(id: number) {
    this.currentTab = id;
    if (this.libro) {
      this.hideTab = true;
    }
    console.log(`Cambiado al tab: ${id}`);
  }

  showEditView(item: any) {
    if (this.esLibro(item)) {
      this.currentTab = 'libro';
      this.libro = item;
      this.hideTab = false;
    }
  }

  showCreateView() {
    this.currentTab = 'createBook';
  }

  esLibro(param: any): param is Libro {
    return param instanceof Object;
  }

  deleteBook(libro: Libro) {
    let index = this.libros.indexOf(libro);
    if (index !== -1) {
      this.libros.splice(index, 1);
      this.RestService.deleteLibro(libro.id).subscribe();
    }
  }

  deleteOrder(pedido: Pedido) {
    let index = this.pedidos.indexOf(pedido);
    if (index !== -1) {
      this.pedidos.splice(index, 1);
      this.RestService.deletePedido(pedido.id).subscribe();
      console.log("ID del pedido a borrar: ",  pedido.id);
    }
  }
  
  showOrderView(item: any) {
    this.currentTab = 'showOrder';
    this.pedido = item;
  }
}
