import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  @Input() pedidos!: Pedido[];
  @Input() usuarios!: Usuario[];
  protected sales: number = 0;

  protected ordenActual: { columna: string, direccion: 'asc' | 'desc' } = { columna: 'id', direccion: 'asc' };

  ngOnInit() {
    this.pedidos.forEach(p => {
      this.sales += p.importe;
      // p.tracking = Math.floor(Math.random() * 101);
      p.tracking = Math.floor(Math.random() * 21) * 5;
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
  
    if (tabla == 'pedidos') {
      this.pedidos.sort((a, b) => {
        const valorA = this.obtenerValorOrdenamiento(a, columna);
        const valorB = this.obtenerValorOrdenamiento(b, columna);
    
        if (typeof valorA === 'string' && typeof valorB === 'string') {
          return this.ordenActual.direccion === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        } else {
          return this.ordenActual.direccion === 'asc' ? valorA - valorB : valorB - valorA;
        }
      });
    } else {
      this.usuarios.sort((a, b) => {
        const valorA = this.obtenerValorOrdenamiento(a, columna);
        const valorB = this.obtenerValorOrdenamiento(b, columna);
    
        if (typeof valorA === 'string' && typeof valorB === 'string') {
          return this.ordenActual.direccion === 'asc' ? valorA.localeCompare(valorB) : valorB.localeCompare(valorA);
        } else {
          return this.ordenActual.direccion === 'asc' ? valorA - valorB : valorB - valorA;
        }
      });
    }
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
      case 'email':
        return registro.email;
      case 'nombre':
        return registro.nombre;
      case 'fecha_creacion':
        return registro.fecha_creacion;
      default:
        return null;
    }
  }
}
