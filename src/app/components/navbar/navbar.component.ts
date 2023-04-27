import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fader } from 'src/app/route-animations';

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
  private router: Router;

  constructor(protected routerp:Router) {
    this.router=routerp;
  }

  // Comprobar si el usuario está logueado
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.userlogin = true;
      console.log("Usuario logueado");
    } 
  }
}
