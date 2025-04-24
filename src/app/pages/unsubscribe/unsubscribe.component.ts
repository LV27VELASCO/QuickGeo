import { Component } from '@angular/core';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './unsubscribe.component.html'
})
export class UnsubscribeComponent {
  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
