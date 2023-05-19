import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Editorial } from 'src/app/interfaces/Editorial';
import { Genero } from 'src/app/interfaces/Genero';
import { Libro } from 'src/app/interfaces/Libro';
import { RestService } from 'src/app/services/api/rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent {
  @Input() libro!: Libro; 
  protected tipos!: string[];
  protected generos!: Genero[];
  protected editoriales!: Editorial[];
  // @Output() callEditBook = new EventEmitter<Libro>();

  constructor(private RestService: RestService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.libro.oferta = (this.libro.precio * 0.95).toFixed(2);
    // this.libro.oferta = '5';
    this.tipos = this.libro.tipo.split(",");
    console.log(this.libro.fecha_publi);
    this.RestService.getGeneros().subscribe(genero => { 
      (this.generos = genero);
    });

    this.RestService.getEditoriales().subscribe(editorial => { 
      (this.editoriales = editorial);
    });
  }

  updateTipos() {
    this.libro.tipo = this.tipos.join(",");
  }

  updatePortada(event: any) {
    const file = event.target.files[0];
    this.libro.portada = file.name;
  }

  updateEditorial() {
    let that = this;
    this.editoriales.forEach(ed => {
      if (ed.id == that.libro.id_editorial) {
        that.libro.editorial = ed.titulo;
      }
    });
  }

  updateGenero() {
    let that = this;
    this.generos.forEach(ge => {
      if (ge.id == that.libro.id_genero) {
        that.libro.genero = ge.titulo;
      }
    });
  }

  edit(form:NgForm) {
    if (form.valid) {
      console.log("haciendo submit valido");
      this.RestService.updateLibro(this.libro).subscribe(
        () => {
          // Actualización exitosa
          console.log("Libro actualizado correctamente");
          // Mostrar alerta de éxito utilizando Angular Material
          this.showSuccessAlert();
        },
        (error) => {
          // Error en la actualización
          console.log("Error al actualizar el libro", error);
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
    this.snackBar.open('Libro actualizado correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }
  
  showErrorAlert() {
    this.snackBar.open('Error al actualizar el libro', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'error-snackbar' // Clase CSS personalizada para la apariencia de error
    });
  }

  // openBook(libro: Libro) {
  //   this.callEditBook.emit(libro);
  // }
}
