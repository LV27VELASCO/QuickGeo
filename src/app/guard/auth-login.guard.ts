import { CanActivate, Router } from '@angular/router';
import { UtilitiesService } from '../services/utilities.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  
  constructor(private utils:UtilitiesService) {}
  
  canActivate(): boolean {
    if (!this.utils.isAuthenticated()) {
      this.utils.navigate('login'); // Redirige al login si no está autenticado
      return false;
    }
    return true;
  }
};
