import { Component } from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import { UtilitiesService } from '../../../services/utilities.service';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [RouterOutlet,RouterLink,],
  templateUrl: './header-dashboard.component.html',
  styleUrl: './header-dashboard.component.css'
})
export class HeaderDashboardComponent {
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
