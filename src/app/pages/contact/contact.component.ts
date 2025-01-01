import { Component} from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent { 
}
