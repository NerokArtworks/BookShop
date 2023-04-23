import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/interfaces/Genero';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  protected id_genero!: number;
  public libros: Libro[] = [];
  public generos: Genero[] = [];
  protected genero!: string;
  protected pageLoaded: boolean = false;

  constructor(private LibroService: RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id_genero = this.route.snapshot.paramMap.get('id');
    console.log(`Cargando datos del género: ${id_genero}`);
    if (id_genero) {
      this.id_genero = parseInt(id_genero, 10);
      console.log(`Convertido: ${id_genero}`);
      this.LibroService.getLibrosByGenero(this.id_genero).subscribe(libro => {(this.libros = libro); this.loadFeed();});
      this.LibroService.getGeneros().subscribe(genero => {(this.generos = genero); this.loadFeed();});
    }
  }

  loadFeed(): void {
    console.log(this.generos, this.libros);
    // Aplico la oferta y su género a cada libro
    const that = this;
    if (this.libros && this.generos) {
      console.log("Libros y géneros cargados");
      this.libros.forEach(l => {
        l.oferta = (l.precio * 0.95).toFixed(2);
        that.generos.forEach(g => {
          if (l.id_genero == g.id) {
            l.genero == g.nombre;
            that.genero == l.genero;
            that.pageLoaded = true;
            console.log("Libro encontrado: ", l, "Género: ", that.genero);
          }
        });
      });
      this.shuffle(this.libros);
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

}
