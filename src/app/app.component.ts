import { Component} from '@angular/core';
import { UtilitiesService } from './services/utilities.service';
import { Country } from '../Interface/Country';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

   constructor(private utils: UtilitiesService,private router: Router) { }

    _countries: Country[] = [];
    urlFlagBase="https://flagcdn.com/"; 
    flag:string="co";
    codePhone:string="+57";
    showHeader = true;

    ngOnInit() {
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Oculta el Header solo en la ruta '/login'
          this.showHeader = event.url !== '/login';
        }
      });

      this.utils.getCountries().subscribe((data) => {
        this._countries = data.sort((a:any)=> a.name);
      });
      this.utils.setCountries(this._countries);
    }

}
