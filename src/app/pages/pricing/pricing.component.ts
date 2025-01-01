import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { Country } from '../../../Interface/Country';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [HeaderComponent,QuestionsComponent,LocateCardComponent,FooterComponent],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {
    @Input() _countries: Country[] = [];
    @Input() _urlFlagBase: string = '';
    @Input() _flag: string = '';
    @Input() _codePhone: string = '';
}
