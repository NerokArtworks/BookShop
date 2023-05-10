import { NgForm } from '@angular/forms';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private router: Router;
  private auth: AuthService;
  @ViewChild("warn") warn!: ElementRef;

  constructor(protected routerp:Router, authp:AuthService, private renderer: Renderer2) {
    this.router=routerp;
    this.auth=authp;
   }

  login (form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.auth.login(email,password).pipe(first()).subscribe((respuesta: any) =>{
      console.log(respuesta);
      if (respuesta){
        if (respuesta.result != 'fail') {
          localStorage.setItem('token',respuesta);
          window.location.reload();
          this.router.navigate(['/index']);
        } else {
          this.renderer.addClass(this.warn.nativeElement, 'active');
          console.log("Fallo en la autentificación");
        }
      }

    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/index']);
    }
  }


}
