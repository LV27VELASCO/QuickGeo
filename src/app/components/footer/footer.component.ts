import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  select:boolean = false;

  selectShow(){
    this.select = !this.select;
  }

}
