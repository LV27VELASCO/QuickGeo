import { Component, Input } from '@angular/core';
import { QuestionsComponent } from '../../components/questions/questions.component';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { Country } from '../../../Interface/models';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-requently-asked-questions',
  standalone: true,
  imports: [QuestionsComponent,LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './requently-asked-questions.component.html'
})
export class RequentlyAskedQuestionsComponent {
    @Input() _countries: Country[] = [];
    @Input() _urlFlagBase: string = '';
    @Input() _flag: string = '';
    @Input() _codePhone: string = '';
}
