import { Component} from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent { 
}
