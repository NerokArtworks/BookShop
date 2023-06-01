import { Component, EventEmitter, Inject, Input, Output, ViewChild } from '@angular/core';
import { Pedido } from 'src/app/interfaces/Pedido';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('300ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class UserOrdersComponent {
  @Input() pedidos!: Pedido[];
  @Input() user!: Usuario;
  @Output() callShowOrder: EventEmitter<Pedido> = new EventEmitter<Pedido>();
  protected sales: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  
  startIndex = 0; // Índice de inicio de la página actual
  endIndex = 5; // Índice de fin de la página actual

  protected ordenActual: { columna: string, direccion: 'asc' | 'desc' } = { columna: 'id', direccion: 'asc' };

  constructor(@Inject(MatPaginatorIntl) private paginatorIntl: MatPaginatorIntl) {
    // Custom Paginator Text
    this.paginatorIntl.itemsPerPageLabel = 'Libros por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
  }

  ngOnInit() {
    this.pedidos.forEach(p => {
      this.sales += p.importe;
      // p.tracking = Math.floor(Math.random() * 101);
      p.tracking = Math.floor(Math.random() * 21) * 5;
      console.log(p);
    });
  }

  numberFormat(number: any, decimals = 0, decimalSeparator = '.', thousandsSeparator = ',') {
    number = parseFloat(number);
    
    // Verificar si es un número válido
    if (!isFinite(number) || isNaN(number)) {
      return number;
    }
    
    // Redondear el número a la cantidad de decimales especificada
    number = number.toFixed(decimals);
    
    // Separar los miles con el separador correspondiente
    let parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
    
    // Unir las partes del número con los separadores correspondientes
    return parts.join(decimalSeparator);
  }

  ordenarRegistros(columna: string, tabla: string) {
    if (this.ordenActual.columna === columna) {
      this.ordenActual.direccion = this.ordenActual.direccion === 'asc' ? 'desc' : 'asc';
    } else {
      this.ordenActual.columna = columna;
      this.ordenActual.direccion = 'asc';
    }
  
    this.pedidos.sort((a, b) => {
      const valorA = this.obtenerValorOrdenamiento(a, columna);
      const valorB = this.obtenerValorOrdenamiento(b, columna);
  
      if (typeof valorA === 'string' && typeof valorB === 'string') {
        return this.ordenActual.direccion === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
      } else {
        return this.ordenActual.direccion === 'asc' ? valorA - valorB : valorB - valorA;
      }
    });
  }

  obtenerValorOrdenamiento(registro: any, columna: string) {
    switch (columna) {
      case 'id':
        return registro.id;
      case 'importe':
        return registro.importe;
      case 'fecha':
        return registro.fecha;
      case 'tracking':
        return registro.tracking;
      case 'username':
        return registro.username;
      default:
        return null;
    }
  }

  openOrder(pedido: Pedido) {
    this.callShowOrder.emit(pedido);
  }

  // Paginator 
  onPageChange(event: any): void {
    const pageEvent = event as PageEvent;
    this.startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    setTimeout(() => {
      this.endIndex = this.startIndex + pageEvent.pageSize;
    }, 299);
  }

  getBooksForPage(): any[] {
    return this.pedidos;
  }
}