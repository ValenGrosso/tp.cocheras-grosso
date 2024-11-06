import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class CocheraService {
  constructor(private authService: AuthService) {}

  async obtenerListaCocheras(): Promise<any> {
    return fetch('http://localhost:4000/cocheras/', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authService.getToken(),
      },
    }).then(response => response.json());
  }

  async habilitarCochera(cocheraId: number): Promise<void> {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas habilitar esta cochera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, habilitar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      await fetch(`http://localhost:4000/cocheras/${cocheraId}/enable`, {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + this.authService.getToken(),
        },
      });
    }
  }

  async deshabilitarCochera(cocheraId: number): Promise<void> {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas deshabilitar esta cochera?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, deshabilitar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      const data = { deshabilitado: true };
      await fetch(`http://localhost:4000/cocheras/${cocheraId}/disable`, {
        method: 'POST',
        headers: {
          authorization: 'Bearer ' + this.authService.getToken(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }
  }

  async abrirEstacionamiento(idCochera: number, patente: string, horaIngreso: string): Promise<void> {
    const data = { idCochera, patente, horaIngreso };
    await fetch('http://localhost:4000/estacionamientos/abrir', {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async cerrarEstacionamiento(patente: string): Promise<{ costo: number } | void> {
    const response = await fetch(`http://localhost:4000/estacionamientos/cerrar`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + this.authService.getToken(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patente }),
    });
    return response.json();
  }

  async eliminarCochera(cocheraId: number): Promise<void> {
    const confirm = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas eliminar esta cochera?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
        await fetch(`http://localhost:4000/cocheras/${cocheraId}`, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.authService.getToken(),
            },
        });
    }
}

async agregarNuevaFila(nombreCochera: string): Promise<void> {
  await fetch('http://localhost:4000/cocheras/', {
      method: 'POST',
      headers: {
          Authorization: 'Bearer ' + this.authService.getToken(),
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ descripcion: nombreCochera })
  });
}

}
