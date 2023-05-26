import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/interfaces/Genero';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0)' })),
      transition(':enter', [
        animate('300ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.68, 0.27, 0.32, 1.37)', style({ opacity: 0, transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class SearchComponent {
  protected id_genero!: number;
  public libros: Libro[] = [];
  public generos: Genero[] = [];
  protected pageLoaded: boolean = false;
  protected results: Libro[] = [];
  protected initialQuery!: string | null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  customPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();

  startIndex = 0; // Índice de inicio de la página actual
  endIndex = 15; // Índice de fin de la página actual

  constructor(private LibroService: RestService, private route: ActivatedRoute, @Inject(MatPaginatorIntl) private paginatorIntl: MatPaginatorIntl) {
    // Custom Paginator Text
    this.paginatorIntl.itemsPerPageLabel = 'Libros por página:';
    this.paginatorIntl.nextPageLabel = 'Siguiente página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.firstPageLabel = 'Primera página';
    this.paginatorIntl.lastPageLabel = 'Última página';
  }

  ngOnInit(): void {
    this.initialQuery = this.route.snapshot.paramMap.get('filter');
    console.log(this.initialQuery);
    this.LibroService.getLibros().subscribe(libro => {(this.libros = libro); (this.results = libro); this.loadFeed();});
    this.LibroService.getGeneros().subscribe(genero => {(this.generos = genero); this.loadFeed();});
  }

  loadFeed(): void {
    console.log(this.generos, this.libros);
    // Aplico la oferta y su género a cada libro
    const that = this;
    if (this.libros && this.generos) {
      console.log("Libros y géneros cargados");
      this.libros.forEach(l => {
        l.oferta = (l.precio * 0.95).toFixed(2);
      });
      this.shuffle(this.libros);
      this.buscarLibros();
      that.pageLoaded = true;
    }
  }

  shuffle(array: Libro[]): Libro[] {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  buscarLibros(event?: any) {
    if (!event && this.initialQuery != null) {
      let query = this.initialQuery;

      this.results = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(query) || libro.autor.toLowerCase().includes(query) || libro.saga.toLowerCase().includes(query)
      );
    } else {
      const query = event.target.value.toLowerCase();

      if (!query) {
        this.results = this.libros;
        return;
      }

      this.results = this.libros.filter(libro =>
        libro.titulo.toLowerCase().includes(query) || libro.autor.toLowerCase().includes(query) || libro.saga.toLowerCase().includes(query)
      );
    }
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
    return this.results;
  }
}
