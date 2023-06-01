import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent {
  @Input() user!: Usuario;
}
