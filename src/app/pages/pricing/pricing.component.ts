import { Component, Input } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { Country } from '../../../Interface/models';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './pricing.component.html'
})
export class PricingComponent {

    constructor(private http: HttpClient) {}

    @Input() _countries: Country[] = [];
    @Input() _urlFlagBase: string = '';
    @Input() _flag: string = '';
    @Input() _codePhone: string = '';

    buttonLocation:boolean=true;

    ngOnInit() {
      if (typeof window !== 'undefined'){
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

     onCheckout() {
      this.buttonLocation =false;
        this.http.post(`${environment.apiUrl}/checkout`, { lookup_key: 'fullgeo_mensual' })
          .subscribe({
            next:  async (res:any)=>{
              let stripe = await loadStripe(environment.pkStripe)
              stripe?.redirectToCheckout({sessionId: res.id})
            },
            error: (err) => {
              this.buttonLocation = true;
            }
          })
        }
}
