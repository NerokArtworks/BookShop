import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { CestaService } from 'src/app/services/cesta-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GASTOS_ENVIO, OFERTA, PRECIO_EBOOK, PTO_TAPABLANDA } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    trigger('fade', [
      state('void', style({ opacity: 1 })),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ]
})

export class CartComponent implements OnInit{
  protected itemsCesta: any[] = [];
  protected cartEmpty: boolean = false;
  protected total: number = 0;
  protected userlogin: boolean = false;

  constructor(private CestaService: CestaService) {}

  ngOnInit(): void {
    // Cargar los items de la cesta de compra
    let serviceItems = this.CestaService.getItems();
    console.log("Items en el cartService: ", serviceItems);
    if (serviceItems[0] == 'empty') {
      this.cartEmpty = true;
    } else {
      this.itemsCesta = serviceItems;
      // Calcular el total del pedido
      this.calculateTotal();
    }

    // Comprobar si el usuario está logueado
    const token = localStorage.getItem('token');
    if (token) {
      this.userlogin = true;
      console.log("Usuario logueado");
    } else {
      this.userlogin = false;
    }
    
  }

  increment(item: Libro) {
    // item.cantidad++;
    this.CestaService.increaseItem(item);
    this.calculateTotal();
  }

  decrement(item: Libro) {
    if (item.cantidad > 1) {
      // item.cantidad--;
      this.CestaService.decreaseItem(item);
      this.calculateTotal();
    }
  }

  deleteItem(item: Libro) {
    this.CestaService.deleteItem(item);
    // Actualizar lista de items tras eliminar
    let serviceItems = this.CestaService.getItems();
    if (serviceItems[0] == 'empty') {
      setTimeout(() => {
        this.cartEmpty = true;
      }, 300);
    } else {
      this.itemsCesta = serviceItems;
    }
    this.calculateTotal();
  }

  // Calcular total del pedido
  calculateTotal() {
    // Total reset
    this.total = 0;
    let that = this;

    // Recorrer los items de la cesta y sumar precios al total
    this.itemsCesta.forEach(libro => {
      if (libro.tapa = 'tapadura') {
        // Precio normal
      } else if (libro.tapa = 'tapablanda') {
        // Para libros en tapablanda reducir un 48.56% el precio de tapadura
        libro.precio = parseFloat(((libro.precio * PTO_TAPABLANDA) / 100).toFixed(2)); // Da problemas
      } else if(libro.tapa = 'ebook') {
        // Para libros en ebook asignar 9.99€
        libro.precio = PRECIO_EBOOK;
      }
      that.total += parseFloat((libro.precio * OFERTA * libro.cantidad).toFixed(2)); // 48.96
      // Lo redondeo después de cada suma pues puede seguir generando decimales extra
    });
    // Gastos de envio
    that.total = parseFloat((that.total + GASTOS_ENVIO).toFixed(2));
    console.log(`Total compra: ${this.total} €`);
  }
}
