import { Component } from '@angular/core';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cgu',
  standalone: true,
  imports: [LocateCardComponent,FooterComponent,TranslateModule],
  templateUrl: './cgu.component.html'
})
export class CguComponent {

  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
