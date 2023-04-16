import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { CestaService } from 'src/app/services/cesta-service.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  itemsCesta: any[] = [];
  cartEmpty: boolean = false;
  total: number = 0;

  constructor(private CestaService: CestaService) {}

  ngOnInit(): void {
    let serviceItems = this.CestaService.getItems();
    console.log("Items en el cartService: ", serviceItems);
    if (serviceItems[0] == 'empty') {
      this.cartEmpty = true;
    } else {
      this.itemsCesta = serviceItems;
      this.calculateTotal();
    }
  }

  increment(item: Libro) {
    item.cantidad++;
    this.calculateTotal();
  }

  decrement(item: Libro) {
    if (item.cantidad > 1) {
      item.cantidad--;
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

  calculateTotal() {
    // Total reset
    this.total = 0;
    this.itemsCesta.forEach(libro => {
      this.total += parseFloat((libro.precio * 0.95 * libro.cantidad).toFixed(2));
      // Lo redondeo después de cada suma pues puede seguir generando decimales extra
      this.total = parseFloat(this.total.toFixed(2));
    });
    console.log(`Total compra: ${this.total} €`);
  }
}
