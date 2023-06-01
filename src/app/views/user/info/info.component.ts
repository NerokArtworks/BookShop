import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pedido } from 'src/app/interfaces/Pedido';
import { Usuario } from 'src/app/interfaces/Usuario';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {
  @Input() user!: Usuario;
  @Input() orders!: Pedido[];
  @Output() callEditUserInfo: EventEmitter<Usuario> = new EventEmitter<Usuario>();

  addCredits() {
    this.user.saldo += 50;
  }

  editUserInfo() {
    console.log("Call edit user info");
    this.callEditUserInfo.emit(this.user);
  }
}

