import { Component } from '@angular/core';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html'
})
export class QuestionsComponent {

  acordions:boolean[]=[false,false,false,false,false,false,false,false];

  setAccordeon(index:number){
    this.acordions[index]=!this.acordions[index];
  }

}
