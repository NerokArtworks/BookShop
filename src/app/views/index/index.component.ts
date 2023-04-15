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
  constructor(private LibroService: RestService) { }

  ngOnInit(): void {
    this.LibroService.getLibros().subscribe(libro => { (this.libros = libro); console.log(libro); console.log(libro[0].id); this.loadHero(); });
  }

  loadHero() {
    this.libros.forEach(l => {
      if (l.id == 1 || l.id == 3 || l.id == 7 || l.id == 11) {
        l.oferta = (l.precio * 0.95).toFixed(2);
        this.librosHero.push(l);
      }
    });
  }
}
