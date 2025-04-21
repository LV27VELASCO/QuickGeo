import { Component, Inject, inject ,NgZone,OnInit,OnDestroy, PLATFORM_ID,ApplicationRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './how-it-works.component.html'
})
export class HowItWorksComponent implements OnInit, OnDestroy{

  constructor(@Inject(PLATFORM_ID) private platformId: object,private appRef: ApplicationRef) {}

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
      this.ngZone.run(() => { // Se vuelve acceder a la zona de angular para que renderice el documento al cambiar el valor
        this.currentIndex = (this.currentIndex + 1) % 3; // Cambia el índice activo
      });
    }, 5000); // Cambia cada 4 segundos

  }

  stopCycle() {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpia el intervalo al destruir el componente
    }
  }
}
