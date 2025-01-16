import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  testimonios =[true,false,false];
  password = false;
  

  prevCard(){
    let currentIndex = this.testimonios.indexOf(true); // Encuentra el índice del valor `true`
    // Si hay un `true`, cámbialo a `false` y pasa al índice anterior
    if (currentIndex !== -1) {
      this.testimonios[currentIndex] = false;
      let prevIndex = (currentIndex - 1 + this.testimonios.length) % this.testimonios.length; // Cicla al final si llega al inicio
      this.testimonios[prevIndex] = true;
    } else {
      this.testimonios[this.testimonios.length - 1] = true; 
    }
  }

  nextCard(){
    let currentIndex = this.testimonios.indexOf(true); 
    if (currentIndex !== -1) {
      this.testimonios[currentIndex] = false;
      let nextIndex = (currentIndex + 1) % this.testimonios.length;
      this.testimonios[nextIndex] = true;
    } else {
      this.testimonios[0] = true; 
    }
  }

  showPassword(){
    this.password = !this.password
  }

}
