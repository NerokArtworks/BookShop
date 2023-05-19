import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private router: Router;
  private auth: AuthService;
  protected showWarn: boolean = false;
  protected passwordInvalid: boolean = false;
  private newUser!: Usuario;

  constructor(protected routerp:Router, authp:AuthService, private LibrosService: RestService) {
    this.router=routerp;
    this.auth=authp;
   }

  register (form:NgForm){
    if (form.valid) {
      if (form.value.password === form.value.password2) {
        const email = form.value.email;
        const password = form.value.password;
        const username = form.value.username;
        const dni = form.value.dni;
        const nombre = form.value.nombre;
        const apellidos = form.value.apellidos;

        const newUser: Usuario = {
          id: null,
          username: username,
          password: password,
          dni: dni,
          nombre: nombre,
          apellidos: apellidos,
          fecha_nac: new Date(),
          fecha_creacion: new Date(),
          pais: null,
          email: email,
          telefono: null,
          socio: 0,
          rol: null
        };

        console.log(newUser);
        this.newUser = newUser;
        this.LibrosService.registerUser(newUser).subscribe((user=>{
          // Login after succesfull register
          this.login();
        }));
      } else {
        this.passwordInvalid = true;
      }
    } else {
      this.showWarn = true;
    }
  }

  login (){
    this.auth.login(this.newUser.email, this.newUser.password).pipe(first()).subscribe((respuesta: any) =>{
      console.log(respuesta);
      if (respuesta){
        localStorage.setItem('token',respuesta);
        window.location.reload();
        this.router.navigate(['/index']);
      }

    })
  }
}
