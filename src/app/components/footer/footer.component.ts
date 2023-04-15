import { Component } from '@angular/core';
import { fader } from 'src/app/route-animations';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  animations: [
    fader
  ]
})
export class FooterComponent {

}
