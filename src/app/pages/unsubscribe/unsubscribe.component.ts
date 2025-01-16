import { Component } from '@angular/core';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [LocateCardComponent,FooterComponent],
  templateUrl: './unsubscribe.component.html'
})
export class UnsubscribeComponent {

}
