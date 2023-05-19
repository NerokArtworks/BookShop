import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private token = localStorage.getItem('token');

  constructor (private router: Router) {
  }

  ngOnInit(): void {
    if (this.token) {
      localStorage.removeItem('token');
      window.location.reload();
      this.router.navigate(['/login']);
    }
  }
}