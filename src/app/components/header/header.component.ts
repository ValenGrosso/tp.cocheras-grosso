import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  imports: [RouterModule],
  selector: 'app-encabezado',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  esAdmin: boolean = true;
  private auth = inject(AuthService);

  abrirModal() {
    Swal.fire({
      title: "Ingrese su dirección IP",
      input: "text",
      inputLabel: "Su dirección IP",
      inputValue: "",
      showCancelButton: true
    }).then((result) => {
      console.log(result);
    });
  }

  cerrarSesion() {
    this.auth.logout();
  }
}