import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports:[RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menu:boolean = false;

  menuActivate(){
    this.menu = !this.menu
  }

}
