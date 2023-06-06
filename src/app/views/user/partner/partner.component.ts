import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css']
})
export class PartnerComponent implements OnInit{
  @Input() user!: Usuario;
  protected isPartner: boolean = false;

  constructor(private RestService: RestService) { }

  ngOnInit() {
    if (this.user.socio != 0) {
      this.isPartner = true;
    }
  }

  becomePartner() {
    if (this.user.socio == 0) {
      this.user.socio = 1;
      this.isPartner = true;
      this.RestService.updateUsuario(this.user).subscribe();
    }
  }
}
