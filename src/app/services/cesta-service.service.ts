import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/Libro';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  items: Libro[] = [];

  constructor() {
    const itemsCestaGuardados = localStorage.getItem('itemsCesta');
    if (itemsCestaGuardados) {
      this.items = JSON.parse(itemsCestaGuardados);
    }
  }

  addItem(item: Libro): void {
    // Controlar que la cantidad por defecto no está asignada
    if (!item.cantidad) {
      console.log("Cantidad Nan, pasa a 1 unidad");
      item.cantidad = 1;
    }

    // Controlar que si ya existe ese libro en el carrito se incremente su cantidad
    const libroExistente = this.items.find(i => i.id === item.id);
    if (libroExistente) {
      console.log(`Libro ya existe en cesta: ${libroExistente}, cantidad: ${libroExistente.cantidad}`);
      libroExistente.cantidad++;
      console.log(`Nueva cantidad: ${libroExistente.cantidad}`);
      // Guardo el array de items con el valor actualizado en localStorage
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));

    } else {
      this.items.push(item);
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));

      console.log(`Nuevo item en la cesta: ${item.titulo}`);
      console.log(`CestaService length: ${this.items.length}`);
    }
  }

  deleteItem(item: Libro): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));
    }
  }

  getItems(): any[] {
    console.log("Items en el cart service al obtener",this.items);
    if (this.items.length > 0) {
      return this.items;
    } else {
      const emptyCart = ['empty'];
      return emptyCart;
    }
  }
}
