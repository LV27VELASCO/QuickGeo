import { Component } from '@angular/core';
import { HeaderDashboardComponent } from '../../components/headers/header-dashboard/header-dashboard.component';
import { SelectCountryComponent } from '../../components/select-country/select-country.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderDashboardComponent, SelectCountryComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  hover:boolean=false;

  onHover() {
    this.hover = true
  }

  onLeave() {
    this.hover = false
  }
}
