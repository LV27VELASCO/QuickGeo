import { Component} from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { TestimonialComponent } from '../../components/testimonial/testimonial.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,TestimonialComponent,HowItWorksComponent,
    QuestionsComponent,LocateCardComponent,FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
}
