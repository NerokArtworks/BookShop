import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
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

  constructor(protected routerp:Router, authp:AuthService) {
    this.router=routerp;
    this.auth=authp;
   }

  login (form:NgForm){
    const email=form.value.email;
    const password=form.value.password;
    this.auth.login(email,password).pipe(first()).subscribe((respuesta: any) =>{
      console.log(respuesta);
      if (respuesta){
        localStorage.setItem('token',respuesta);
        this.router.navigate(['/index']);
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
