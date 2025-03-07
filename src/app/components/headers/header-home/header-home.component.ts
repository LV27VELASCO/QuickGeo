import { Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterOutlet,RouterLink,TranslateModule],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        animate(
          '600ms ease-in-out',
          keyframes([
            style({ transform: 'scale(1.1)', filter: 'blur(3px)', opacity: 0, offset: 0 }),
            style({ transform: 'scale(1)', filter: 'blur(0)', opacity: 1, offset: 1 }),
          ])
        ),
      ]),
    ]),
  ],
})
export class HeaderHomeComponent {
  menu:boolean = false;

  constructor(private Utils:UtilitiesService){ }

  ngOnInit(){
    if (typeof window !== 'undefined' && window.localStorage) {
       this.Utils.clearLocalStorage()
    }
  }

  menuActivate(){
    this.menu = !this.menu
  }

  navegar(ruta:string){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.Utils.navigate(ruta)
  }

}
