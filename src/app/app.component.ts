import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menu:boolean = false;
  select:boolean = false;

  countries: any[] = [];


  // ngOnInit() {
  //   this.utils.getCountries().subscribe((data) => {
  //     this.countries = data;
  //     console.log('Países:', this.countries);
  //   });
  // }

  menuActivate(){
    this.menu = !this.menu
  }

  selectShow(){
    this.select = !this.select
  }

}
