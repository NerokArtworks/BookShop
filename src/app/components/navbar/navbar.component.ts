import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { fader } from 'src/app/route-animations';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    fader
  ]
})
export class NavbarComponent implements OnInit {
  protected userlogin: boolean = false;
  protected index: boolean = false;
  protected user!: Usuario;
  private router: Router;

  constructor(protected routerp:Router, private RestService: RestService) {
    this.router = routerp;
  }

  // Comprobar si el usuario está logueado
  ngOnInit(): void {
    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        this.userlogin = true;
        console.log("Usuario logueado");
        this.RestService.getUserByJWT(token).subscribe(usuario => {
          (this.user = usuario);
        })
      } else {
        this.userlogin = false;
      }

      if (!this.router.url.endsWith('/login') && !this.userlogin) {
        this.index = true;
      }
    })
  }
}
