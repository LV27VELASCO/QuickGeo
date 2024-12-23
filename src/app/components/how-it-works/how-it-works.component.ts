import { Component, Inject, inject ,NgZone,OnInit,OnDestroy, PLATFORM_ID,ApplicationRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent implements OnInit, OnDestroy{

  constructor(@Inject(PLATFORM_ID) private platformId: object,private appRef: ApplicationRef) {}

  

  items = 3; // Tres elementos
  currentIndex = -1; // Índice del elemento activo
  intervalId!: any; // ID del intervalo
  private ngZone = inject(NgZone); 

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      if (isPlatformBrowser(this.platformId)) {
        this.startCycle();
      }
    });
  }

  ngOnDestroy() {
    this.stopCycle();
  }

  startCycle() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.items; // Cambia el índice activo
    }, 4000); // Cambia cada 4 segundos
    
  }

  stopCycle() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
    }
  }
}
