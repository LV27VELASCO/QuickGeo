import { Component} from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { Country } from '../Interface/Country';
import { UtilitiesService } from './services/utilities.service';
import { SelectCountryComponent } from './components/select-country/select-country.component';
import { LocateCardComponent } from './components/locate-card/locate-card.component';
import { FooterComponent } from './components/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent,HeroComponent,TestimonialComponent,HowItWorksComponent,QuestionsComponent,SelectCountryComponent,LocateCardComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

   constructor(private utils: UtilitiesService) { }

    _countries: Country[] = [];
    urlFlagBase="https://flagcdn.com/"; 
    flag:string="co";
    codePhone:string="+57";
    ngOnInit() {
      this.utils.getCountries().subscribe((data) => {
        this._countries = data.sort((a:any)=> a.name);
      });
    }

}
