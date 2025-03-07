import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExternalOriginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const allowedOrigin = 'https://ejemplo.com'; // URL permitida
    const referrer = document.referrer; // Captura la URL externa de referencia

    if (referrer.startsWith(allowedOrigin)) {
      return true;
    } else {
      this.router.navigate(['/acceso-denegado']); // Redirigir si no cumple
      return false;
    }
  }
}
