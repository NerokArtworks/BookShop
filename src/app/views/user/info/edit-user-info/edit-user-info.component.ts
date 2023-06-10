import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css']
})
export class EditUserInfoComponent {
  @Input() user!: Usuario;

  constructor(private RestService: RestService, private snackBar: MatSnackBar) { }

  edit(form:NgForm) {
    if (form.valid) {
      console.log("haciendo submit valido");
      this.RestService.updateUsuario(this.user).subscribe(
        () => {
          // Actualización exitosa
          console.log("Usuario actualizado correctamente");
          // Mostrar alerta de éxito utilizando Angular Material
          this.showSuccessAlert();
        },
        (error) => {
          // Error en la actualización
          console.log("Error al actualizar el usuario", error);
          // Mostrar alerta de error utilizando Angular Material
          this.showErrorAlert();
        }
      );
    } else {
      // this.showWarn = true;
    }
  }

  showSuccessAlert() {
    this.snackBar.open('Datos personales actualizados correctamente', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'success-snackbar' // Clase CSS personalizada para la apariencia de éxito
    });
  }
  
  showErrorAlert() {
    this.snackBar.open('Error al actualizar los datos personales', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      panelClass: 'error-snackbar' // Clase CSS personalizada para la apariencia de error
    });
  }
}
