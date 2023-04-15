import { Component } from '@angular/core';
import { fader } from 'src/app/route-animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    fader
  ]
})
export class NavbarComponent {

}
