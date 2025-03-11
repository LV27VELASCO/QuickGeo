import { Component } from '@angular/core';
import { Detail } from '../../../Interface/models';
import { ApiService } from '../../services/api.service';
import { UtilitiesService } from '../../services/utilities.service';
import { SelecCountryDashboardComponent } from '../../components/select-country-dashboard/select-country-dashboard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SelecCountryDashboardComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  hover:boolean=false;
  locationHistory:Detail[] | undefined;

  constructor(private utils:UtilitiesService,private api:ApiService){}

  ngOnInit(){
    this.getHistoryLocations();
  }

  onHover() {
    this.hover = !this.hover
  }

  getHistoryLocations(){
    this.api.GetHistoryLocations().subscribe({
      next: (data) => {
        this.locationHistory = data.details
      },
      error: (err) => {
        if (err.status === 401) {
          console.error("No autorizado (401). Verifica tu token.");
          this.utils.removeCookie('access_token');
          this.utils.navigate('login');
        } else{
          console.error(err);
        }
      }
    });
  }

  obtenerFechaFormateada(fechaString: string): string {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getUTCDate()).padStart(2, '0');
    const mes = String(fecha.getUTCMonth() + 1).padStart(2, '0');
    const anio = String(fecha.getUTCFullYear()).slice(-2);
    return `${dia}/${mes}/${anio}`;
  }

 obtenerHoraFormateada(fechaString: string): string {
    const fecha = new Date(fechaString);
    const horas = String(fecha.getUTCHours()).padStart(2, '0');
    const minutos = String(fecha.getUTCMinutes()).padStart(2, '0');
    const segundos = String(fecha.getUTCSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  }

  openGoogleMaps(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  }

}
