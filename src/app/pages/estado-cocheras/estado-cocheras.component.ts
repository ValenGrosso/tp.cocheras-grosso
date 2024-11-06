// src/app/components/tu-componente/tu-componente.component.ts

import { Component, OnInit } from '@angular/core';
import { CocheraService } from '../../services/cocheras.service';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  imports: [RouterModule,  HeaderComponent, CommonModule],
  selector: 'app-tu-componente',
  templateUrl:  './estado-cocheras.component.html',
  styleUrls: ['./estado-cocheras.component.scss']
})
export class EstadoCocherasComponent implements OnInit {
  cocheras: any[] = [];

  constructor(private cocheraService: CocheraService) {}

auth = inject(AuthService)



  ngOnInit(): void {
    this.cargarCocheras();
  }

  cargarCocheras() {
    this.cocheraService.obtenerListaCocheras().then(cocheras => {
      this.cocheras = cocheras;
    });
  }

  async habilitarCochera(id: number) {
    await this.cocheraService.habilitarCochera(id);
    this.cargarCocheras();
  }

  async deshabilitarCochera(id: number) {
    await this.cocheraService.deshabilitarCochera(id);
    this.cargarCocheras();
  }

  async abrirModalNuevoEstacionamiento(idCochera: number) {
    const result = await Swal.fire({
      title: "Ingrese la patente del vehículo",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => !value ? "Ingrese una patente válida" : null,
    });

    if (result.isConfirmed) {
      const patente = result.value;
      const horaIngreso = new Date().toLocaleTimeString();
      await this.cocheraService.abrirEstacionamiento(idCochera, patente, horaIngreso);
      this.cargarCocheras();
    }
  }

  async cerrarModalEstacionamiento(patente: string) {
    const result = await Swal.fire({
      title: "¿Desea cerrar el estacionamiento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      const data = await this.cocheraService.cerrarEstacionamiento(patente);
      if (data) {
        await Swal.fire({
          title: "Cierre exitoso",
          text: `Se cobró un total de $${data.costo}.`,
          icon: "success"
        });
        this.cargarCocheras();
      }
    }
  }

  eliminarCochera(cocheraId: number) {
    this.cocheraService.eliminarCochera(cocheraId)
        .then(() => this.cargarCocheras())
        .catch(error => console.error('Error en la eliminación:', error));
}

async agregarNuevaFila() {
  const { value: nombreCochera } = await Swal.fire({
      title: "Ingrese el nombre de la cochera",
      input: "text",
      inputLabel: "Nombre de cochera",
      inputValue: '',
      showCancelButton: true,
  });

  if (nombreCochera) {
      this.cocheraService.agregarNuevaFila(nombreCochera)
          .then(() => this.cargarCocheras())
          .catch(error => console.error('Error en la solicitud:', error));
  }
}

}
