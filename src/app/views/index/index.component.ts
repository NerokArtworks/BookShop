import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { fader } from 'src/app/route-animations';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit{
  libros: Libro[] = [];
  librosHero: Libro[] = [];
  librosBrandon: Libro[] = [];
  librosBrandonShow: Libro[] = [];
  librosRobert: Libro[] = [];
  librosRobertShow: Libro[] = [];
  librosManga: Libro[] = [];
  constructor(private LibroService: RestService) { }

  ngOnInit(): void {
    this.LibroService.getLibros().subscribe(libro => { (this.libros = libro); console.log(libro); console.log(libro[0].id); this.loadHero(); });
    this.LibroService.getLibrosByAutor("Brandon Sanderson").subscribe(libro => { (this.librosBrandon = libro); console.log(libro); this.loadBrandon(); });
    this.LibroService.getLibrosByAutor("Robert Jordan").subscribe(libro => { (this.librosRobert = libro); console.log(libro); this.loadRobert(); });
  }

  loadHero() {
    this.libros.forEach(l => {
      if (l.id == 1 || l.id == 3 || l.id == 7 || l.id == 11) {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosHero.push(l);
      }
      if (l.genero == "Manga") {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosManga.push(l);
      }
    });
  }

  loadBrandon() {
    this.librosBrandon.forEach(l => {
      if (l.id == 8 || l.id == 12 || l.id == 4 || l.id == 13) {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosBrandonShow.push(l);
      }
    });
  }

  loadRobert() {
    this.librosRobert.forEach(l => {
      if (l.id == 14 || l.id == 15 || l.id == 16 || l.id == 17) {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosRobertShow.push(l);
      }
    });
  }
}
