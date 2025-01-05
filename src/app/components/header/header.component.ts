import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterLink,TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menu:boolean = false;

  constructor(private Utils:UtilitiesService){ }

  menuActivate(){
    this.menu = !this.menu
  }

  navegar(ruta:string){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.Utils.navigate(ruta)
  }

}
