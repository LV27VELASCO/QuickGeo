import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-success-pay',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './success-pay.component.html',
  styleUrl:'./success-pay.component.css'
})
export class SuccessPayComponent {

  constructor(private utils:UtilitiesService){

  }

  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navegar(ruta: string): void {
      // Llamamos a UtilsService para navegar
      this.utils.navigate(ruta)
        .then(() => {
          // Scroll suave al inicio
          window.scrollTo({ top: 0, behavior: 'smooth' });
        })
        .catch(err => console.error('Navigation error:', err));
  }

}
