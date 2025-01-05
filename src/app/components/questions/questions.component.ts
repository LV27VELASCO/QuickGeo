import { Component, Input } from '@angular/core';
import { RouterLink} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {
  @Input() _ishome: boolean = true;

  acordions:boolean[]=[false,false,false,false,false,false,false,false];

  setAccordeon(index:number){
    this.acordions[index]=!this.acordions[index];
  }

}
