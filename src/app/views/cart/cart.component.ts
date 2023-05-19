import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { CestaService } from 'src/app/services/cesta-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { GASTOS_ENVIO, OFERTA, PRECIO_EBOOK, PTO_TAPABLANDA } from 'src/app/constants/app.constants';
import { RestService } from 'src/app/services/api/rest.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  protected itemsCesta: Libro[] = [];
  protected cartEmpty: boolean = false;
  protected total: number = 0;
  protected userlogin: boolean = false;
  protected user!: Usuario;
  protected pedidoKO: boolean = false;

  constructor(private CestaService: CestaService, private RestService: RestService, private AuthService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

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
      var userlogin: number = Number(localStorage.getItem('userlogin'));
      this.RestService.getUser(userlogin).subscribe(user => {(this.user = user);});

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
      if (libro.tapa == 'tapadura') {
        // Precio normal
      } else if (libro.tapa == 'tapablanda') {
        // Para libros en tapablanda reducir un 48.56% el precio de tapadura
        // libro.precio = parseFloat(((libro.precio * PTO_TAPABLANDA) / 100).toFixed(2)); // Da problemas
      } else if(libro.tapa == 'ebook') {
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

  createOrder() {
    let that = this;
    var detallesPedido: any[] = [];
    let importeTotal = 0;
    this.itemsCesta.forEach(item => {
      let importe = (item.precio * OFERTA * item.cantidad).toFixed(2);
      importeTotal += Number(importe);
      detallesPedido.push({
        id: null,
        cantidad: item.cantidad,
        importe: importe,
        libro: item
      });
    });
    
    const pedido: Pedido = {
      id: null,
      fecha: new Date(),
      importe:Math.round((importeTotal + Number.EPSILON) * 100) / 100,
      detallesPedidos: detallesPedido,
      descuento: null,
      usuario: this.user
    }
    console.log("Detalles del pedido: ", detallesPedido);
    console.log("Pedido: ", pedido);

    this.RestService.createOrder(pedido).subscribe(response => {
      (console.log(response));
      // if (response.result == "pedidoOK") {
        // Vaciar cesta
        this.itemsCesta = [];
        this.CestaService.vaciarCesta();
        this.router.navigate(["/index"]);
        // ALERTA
        this.showSuccessAlert();
      // } else {
      //   this.pedidoKO = true;
      //   this.cartEmpty = true;
      // }
    });
  }

  showSuccessAlert() {
    this.snackBar.open('Pedido completado. ¡Pronto tendrás tus libros contigo!', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }
}
