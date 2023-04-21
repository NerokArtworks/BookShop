import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit{
  public id!: string | null;
  public libro!: Libro;
  selectedType!: string;

  constructor(private LibroService: RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id;
    console.log("Viendo libro id: " + this.id);
    this.LibroService.getLibro(id).subscribe(libro => {(this.libro = libro); console.log(libro); this.libro.oferta = (this.libro.precio * 0.95).toFixed(2)});
  }
}
