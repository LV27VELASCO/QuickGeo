import { Component} from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChatBotComponent } from '../../components/chat-bot/chat-bot.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent,TranslateModule,ChatBotComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
