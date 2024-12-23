import { Component} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,HeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
