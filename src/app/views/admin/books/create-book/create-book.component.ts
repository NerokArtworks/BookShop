import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Editorial } from 'src/app/interfaces/Editorial';
import { Genero } from 'src/app/interfaces/Genero';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent {
  protected generos!: Genero[];
  protected editoriales!: Editorial[];
  // Campos libro
  protected titulo!: string;
  protected autor!: string;
  protected saga!: string;
  protected ISBN!: string;
  protected fecha_publi!: Date;
  protected genero!: number;
  protected id_genero!: number;
  protected editorial!: number;
  protected id_editorial!: number;
  protected descripcion!: string;
  protected sinopsis!: string;
  protected precio!: number;
  protected tipo: string = 'tapadura,tapablanda,ebook';
  protected portada!: string;
  protected rating: number = 0;
  protected stock!: number;
  protected oferta!: string;
  protected tipoFinal!: string;
  // @Output() callEditBook = new EventEmitter<Libro>();

  constructor(private RestService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.RestService.getGeneros().subscribe(genero => {
      (this.generos = genero);
    });

    this.RestService.getEditoriales().subscribe(editorial => {
      (this.editoriales = editorial);
    });
  }

  // updateTipos() {
  //   this.libro.tipo = this.tipos.join(",");
  // }

  updatePortada(event: any) {
    const file = event.target.files[0];
    this.portada = file.name;
  }

  edit(form:NgForm) {
    if (form.valid) {
      console.log("haciendo submit valido");
      const newBook: Libro = {
        id: null,
        titulo: form.value.titulo,
        autor: form.value.autor,
        saga: form.value.saga,
        ISBN: form.value.ISBN,
        fecha_publi: form.value.fecha_publi,
        genero: form.value.id_genero,
        id_genero: form.value.id_genero,
        editorial: form.value.id_editorial,
        id_editorial: form.value.id_editorial,
        descripcion: form.value.descripcion,
        sinopsis: form.value.sinopsis,
        precio: form.value.precio,
        tipo: form.value.tipo.join(','),
        portada: this.portada,
        rating: form.value.rating,
        stock: form.value.stock,
        cantidad: 0
      }
      console.log(newBook);
      this.RestService.createLibro(newBook).subscribe(
        () => {
          // Actualización exitosa
          console.log("Libro creado correctamente");
          // Mostrar alerta de éxito utilizando Angular Material
          this.showSuccessAlert();
        },
        (error) => {
          // Error en la actualización
          console.log("Error al crear el libro", error);
          // Mostrar alerta de error utilizando Angular Material
          this.showErrorAlert();
        }
      );
    } else {
      // this.showWarn = true;
      console.log("haciendo submit inválido");
    }
  }

  showSuccessAlert() {
    this.snackBar.open('Libro creado correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }

  showErrorAlert() {
    this.snackBar.open('Error al crear el libro', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'error-snackbar' // Clase CSS personalizada para la apariencia de error
    });
  }
}
