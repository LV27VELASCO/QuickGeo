import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-success-pay',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './success-pay.component.html',
  styleUrl:'./success-pay.component.css'
})
export class SuccessPayComponent {

  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
