import { Component, OnInit } from '@angular/core';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.css'],
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
export class RecentComponent implements OnInit{
  protected libros!: Libro[];
  protected novedades: Libro[] = [];
  protected filtro!: string;

  constructor(private RestService: RestService, private router: Router) { }

  ngOnInit(): void {
    let that = this;
    const lastWeeek = new Date();
    lastWeeek.setDate(lastWeeek.getDate() - 7);
    this.RestService.getLibros().subscribe(libros => {
      const lastWeeek = new Date();
      lastWeeek.setDate(lastWeeek.getDate() - 7);
    
      libros.forEach(libro => {
        if (new Date(libro.fecha_publi) > lastWeeek && that.novedades.length <= 7) {
          libro.oferta = (libro.precio * 0.95).toFixed(2);
          that.novedades.push(libro);
        }
      })
    });
  }

  buscarLibros(form:NgForm) {
    if (form.valid) {
      console.log(form.value.filtro);
      this.router.navigate(['/buscar/' + form.value.filtro]);
    }
  }

}
