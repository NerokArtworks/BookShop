import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/Libro';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  items: Libro[] = [];

  constructor() {
    this.updateItems();
  }

  addItem(item: Libro): boolean {
    this.updateItems();

    // Controlar que la cantidad por defecto no está asignada
    if (!item.cantidad) {
      console.log("Cantidad Nan, pasa a 1 unidad");
      item.cantidad = 1;
    }

    console.log("Tapa del item añadido: ", item.tapa);

    const filteredItems = this.items.filter(i => i.id === item.id && i.tapa === item.tapa);

    if (filteredItems.length > 0) {
      // Se encontraron elementos que cumplen con las condiciones
      // Controlar que si ya existe ese libro en el carrito se incremente su cantidad
      const libroExistente = filteredItems[0];
      console.log("Tapa del item existente: ", item.tapa);
      console.log('Libro ya existe en cesta: ', libroExistente, `, cantidad: ${libroExistente.cantidad}`);
      if (libroExistente.stock >= (Number(libroExistente.cantidad) + 1).toFixed(0)) {
        libroExistente.cantidad++;
        console.log(`Nueva cantidad: ${libroExistente.cantidad}`);
        // Guardo el array de items con el valor actualizado en localStorage
        localStorage.setItem('itemsCesta', JSON.stringify(this.items));
        return true;
      } else {
        // Se ha superado el stock disponible
        return false;
      }
    } else {
      this.items.push(item);
      console.log("Items del servicio: ", this.items)
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));

      console.log("Nuevo item en la cesta: ", item);
      console.log(`CestaService length: ${this.items.length}`);
      return true;
    }
  }

  updateItems() {
    const itemsCestaGuardados = localStorage.getItem('itemsCesta');
    if (itemsCestaGuardados) {
      this.items = JSON.parse(itemsCestaGuardados);
    }
  }

  increaseItem(item: Libro): void {
    // Controlar que si ya existe ese libro en el carrito se incremente su cantidad
    const libroExistente = this.items.find(i => i.id === item.id && i.tapa === item.tapa);
    if (libroExistente) {
      console.log(`Libro ya existe en cesta: ${libroExistente}, cantidad: ${libroExistente.cantidad}`);
      libroExistente.cantidad++;
      console.log(`Nueva cantidad: ${libroExistente.cantidad}`);
      // Guardo el array de items con el valor actualizado en localStorage
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));
    }
  }

  decreaseItem(item: Libro): void {
    // Controlar que si ya existe ese libro en el carrito se incremente su cantidad
    const libroExistente = this.items.find(i => i.id === item.id && i.tapa === item.tapa);
    if (libroExistente) {
      console.log(`Libro ya existe en cesta: ${libroExistente}, cantidad: ${libroExistente.cantidad}`);
      libroExistente.cantidad--;
      console.log(`Nueva cantidad: ${libroExistente.cantidad}`);
      // Guardo el array de items con el valor actualizado en localStorage
      localStorage.setItem('itemsCesta', JSON.stringify(this.items));
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
    this.updateItems();
    console.log("Items en el cart service al obtener",this.items);
    if (this.items.length > 0) {
      return this.items;
    } else {
      const emptyCart = ['empty'];
      return emptyCart;
    }
  }

  vaciarCesta() {
    localStorage.removeItem('itemsCesta');
    this.items = [];
  }
}
