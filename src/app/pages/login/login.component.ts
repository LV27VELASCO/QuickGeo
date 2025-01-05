import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
