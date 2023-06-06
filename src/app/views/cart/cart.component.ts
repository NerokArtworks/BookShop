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
import { NgForm } from '@angular/forms';
import { Descuento } from 'src/app/interfaces/Descuento';

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
  protected totalSinDescuento!: number;
  protected userlogin: boolean = false;
  protected user!: Usuario;
  protected pedidoKO: boolean = false;
  protected lowCredits: boolean = false;
  protected descuentos!: Descuento[];
  protected descuentoValido!: Descuento | null;
  protected pedidos!: Pedido[];
  protected descuentoUsado: boolean = false;

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
      this.RestService.getUser(userlogin).subscribe(user => {(this.user = user); this.loadDiscounts(); this.loadOrders();});
    } else {
      this.userlogin = false;
    }
  }

  increment(item: Libro) {
    // item.cantidad++;
    if (item.stock >= (item.cantidad + 1).toFixed(0)) {
      this.CestaService.increaseItem(item);
      this.calculateTotal(true);
      if (this.descuentoValido) {
        this.calculateTotal(false, this.descuentoValido);
      }
      this.checkWallet();
    }
  }

  decrement(item: Libro) {
    if (item.cantidad > 1) {
      // item.cantidad--;
      this.CestaService.decreaseItem(item);
      this.calculateTotal(true);
      if (this.descuentoValido) {
        this.calculateTotal(false, this.descuentoValido);
      }
      this.checkWallet();
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
    this.calculateTotal(true);
    if (this.descuentoValido) {
      this.calculateTotal(false, this.descuentoValido);
    }
  }

  // Calcular total del pedido
  calculateTotal(cambiaUnidades?: boolean, discount?: Descuento) {
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

    // Gastos de envio y posible descuento
    if (discount != null && this.total >= discount.importe_minimo) {
      this.total = parseFloat(((this.total + GASTOS_ENVIO) * ((100 - discount.porcentaje) / 100)).toFixed(2));
    } else {
      if (this.totalSinDescuento && !cambiaUnidades) {
        this.total = parseFloat((this.totalSinDescuento + GASTOS_ENVIO).toFixed(2));
      } else {
        this.total = parseFloat((this.total + GASTOS_ENVIO).toFixed(2));
        this.totalSinDescuento = this.total - GASTOS_ENVIO;
      }
    }
    
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
      descuento: this.descuentoValido ?? null,
      usuario: this.user,
      result: null,
    }
    console.log("Detalles del pedido: ", detallesPedido);
    console.log("Pedido: ", pedido);

    // Comprobar saldo
    if (this.user.saldo >= pedido.importe) {
      this.RestService.createOrder(pedido).subscribe(response => {
        (console.log(response));
        // if (response.result == "pedidoOK") {
          // Vaciar cesta
          this.updateStock(detallesPedido);
          this.itemsCesta = [];
          this.CestaService.vaciarCesta();
          this.router.navigate(["/index"]);

          this.user.saldo -= pedido.importe;
          this.user.saldo = Number(this.user.saldo.toFixed(2));
          this.RestService.updateUsuario(this.user).subscribe();

          // ALERTA
          this.showSuccessAlert();
        // } else {
        //   this.pedidoKO = true;
        //   this.cartEmpty = true;
        // }
      });
    } else {
      this.lowCredits = true;
    }

  }

  checkWallet() {
    if (this.user.saldo <= this.total) {
      this.lowCredits = true;
    } else {
      this.lowCredits = false;
    }
  }

  showSuccessAlert() {
    this.snackBar.open('Pedido completado. ¡Pronto tendrás tus libros contigo!', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }

  checkDiscount(form:NgForm) {
    if (form.valid) {
      let that = this;
      this.descuentos.forEach(descuento => {
        console.log("Descuento disponible", descuento);
        if (descuento.titulo == form.value.descuento) {
          // Descuento encontrado
          that.descuentoValido = descuento;

          // Comprobar si ya lo ha usado el usuario en otro pedido
          that.pedidos.forEach(pedido => {
            if (pedido.descuento != null) {
              if (pedido.descuento == descuento.id) {
                // Ya usado
                console.log("Descuento ya usado", descuento);
                that.descuentoUsado = true;
              }
            }
          });

          // Si se ha encontrado un descuento y no está usado
          if (!this.descuentoUsado) {
            that.calculateTotal(false, that.descuentoValido);
            console.log("Descuento encontrado", descuento);
          } else {
            that.descuentoValido = null;
            that.calculateTotal();
            console.log("Descuento ya usado, inválido", form.value.descuento, descuento.titulo);
          }
          
        } else {
          that.descuentoValido = null;
          that.calculateTotal();
          console.log("Descuento inválido", form.value.descuento, descuento.titulo);
        }
      });
    } else {
      this.descuentoValido = null;
      console.log("Descuento inválido", form.value.descuento);
      this.calculateTotal();
    }
  }

  loadDiscounts() {
    // Cargar descuentos si el usuario es socio
    if (this.user.socio == 1) {
      this.RestService.getDescuentos().subscribe(descuentos => { (this.descuentos = descuentos); });
    }
  }

  loadOrders() {
    // Cargar descuentos si el usuario es socio
    if (this.user.socio == 1) {
      this.RestService.getPedidosByUser(this.user.id).subscribe(pedidos => { (this.pedidos = pedidos); });
    }
  }

  updateStock(detallesPedido: any[]) {
    const that = this;
    detallesPedido.forEach(detalle => {
      let libroStock!: Libro;
      console.log("detalle libro", detalle.libro);
      that.restarStock(detalle.libro, detalle.cantidad);
    });
  }

  restarStock(libro: Libro, stock: any) {
    libro.stock = (Number(libro.stock) - stock).toFixed(0);
    console.log("Stock restante del libro " + libro.titulo + ": " + libro.stock);
    this.RestService.updateLibro(libro).subscribe();
  }
}
