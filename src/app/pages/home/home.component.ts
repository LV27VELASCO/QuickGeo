import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { TestimonialComponent } from '../../components/testimonial/testimonial.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { SelectCountryComponent } from '../../components/select-country/select-country.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Country } from '../../../Interface/Country';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent,HeroComponent,
    TestimonialComponent,HowItWorksComponent,
    QuestionsComponent,SelectCountryComponent,
    LocateCardComponent,FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {
}
