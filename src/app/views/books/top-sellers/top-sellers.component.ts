import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/interfaces/Pedido';

@Component({
  selector: 'app-top-sellers',
  templateUrl: './top-sellers.component.html',
  styleUrls: ['./top-sellers.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition(':enter', [
        animate('500ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('500ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class TopSellersComponent {
  protected libros!: Libro[];
  protected pedidos!: Pedido[];
  protected topSellers: Libro[] = [];
  protected filtro!: string;

  constructor(private RestService: RestService, private router: Router) { }

  ngOnInit(): void {
    const lastWeeek = new Date();
    lastWeeek.setDate(lastWeeek.getDate() - 7);
    this.RestService.getPedidos().subscribe(pedidos => {(this.pedidos = pedidos); this.getTopSellers(); })
  }

  buscarLibros(form:NgForm) {
    if (form.valid) {
      console.log(form.value.filtro);
      this.router.navigate(['/buscar/' + form.value.filtro]);
    }
  }

  getTopSellers() {
    let that = this;
    const librosVendidos: { [libroId: string]: number } = {};

    // Recorre el array de pedidos y sus detalles para acumular las cantidades vendidas por cada libro
    this.pedidos.forEach((pedido) => {
      if (pedido.detallesPedidos != null) {
        pedido.detallesPedidos.forEach((detalle) => {
          const libroId = detalle.libro;
          const cantidad = detalle.cantidad;

          if (librosVendidos[libroId]) {
            librosVendidos[libroId] += cantidad;
          } else {
            librosVendidos[libroId] = cantidad;
          }
        });
      }
    });

    // Ordena los libros según la cantidad de ventas en orden descendente
    const librosOrdenados = Object.keys(librosVendidos).sort(
      (a, b) => librosVendidos[b] - librosVendidos[a]
    );

    console.log("Top sellers: ", librosOrdenados);
    // Retorna los libros más vendidos (puedes ajustar la cantidad según tus necesidades)
    const bestSellers = librosOrdenados.slice(0, 8); // Por ejemplo, aquí se obtienen los 5 libros más vendidos

    bestSellers.forEach(id => {
      that.RestService.getLibro(id).subscribe(libro => { (that.topSellers.push(libro)); });
    });
  }

}
