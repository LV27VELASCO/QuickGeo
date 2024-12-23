import { Component} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,HeroComponent,TestimonialComponent,HowItWorksComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
