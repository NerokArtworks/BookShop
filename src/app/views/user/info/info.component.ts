import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Usuario } from 'src/app/interfaces/Usuario';
import { RestService } from 'src/app/services/api/rest.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() user!: Usuario;
  @Input() orders!: Pedido[];
  @Output() callEditUserInfo: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  constructor(private RestService: RestService) { }

  addCredits() {
    this.user.saldo += 50;
    this.RestService.updateUsuario(this.user).subscribe();
  }

  editUserInfo() {
    console.log("Call edit user info");
    this.callEditUserInfo.emit(this.user);
  }
}

