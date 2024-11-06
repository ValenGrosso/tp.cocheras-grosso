import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Estacionamiento } from '../../interfaces/estacionamiento';

@Component({
  selector: 'app-informe-mensual',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})

export class ReporteComponent implements OnInit {

  authService = inject(AuthService);
  estacionamientos: Estacionamiento[] = [];
  reportes: any[] = [];

  ngOnInit(): void {
    this.cargarEstacionamientos();
  }

  cargarEstacionamientos() {
    fetch('http://localhost:4000/estacionamientos', {
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + this.authService.getToken()
      }
    })
      .then((response) => response.json())
      .then((data: Estacionamiento[]) => {
        const historial = data.filter(est => est.horaEgreso != null);
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        
        historial.forEach(estacionamiento => {
          const fecha = new Date(estacionamiento.horaIngreso);
          const mesAnio = `${meses[fecha.getMonth()]} ${fecha.getFullYear()}`;
          
          const reporteExistente = this.reportes.find(r => r.mes === mesAnio);
          if (reporteExistente) {
            reporteExistente.usos++;
            reporteExistente.cobrado += estacionamiento.costo ?? 0;
          } else {
            this.reportes.push({
              mes: mesAnio,
              usos: 1,
              cobrado: estacionamiento.costo ?? 0
            });
          }
        });
      })
      .catch(error => console.error("Error al cargar estacionamientos:", error));
  }
}