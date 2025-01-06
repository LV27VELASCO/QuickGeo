import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UtilitiesService } from '../services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private utils:UtilitiesService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Verificar si 'data' existe en localStorage
    const data = this.utils.getItem('data');

    // Si 'data' no existe, redirigir al usuario
    if (!data) {
      this.utils.navigate('/');  // Redirigir a la ruta de login o donde lo necesites
      return false;
    }

    // Si 'data' existe, permitir la navegación
    return true;
  }
}