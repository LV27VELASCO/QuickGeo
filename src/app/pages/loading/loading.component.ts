import { Component} from '@angular/core';
import { timer } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UtilitiesService } from '../../services/utilities.service';
import { resPhoneInfo } from '../../../Interface/models';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl:'./loading.component.css'
})
export class LoadingComponent {
  isLoading1 = true;  // Controlamos el estado del preloader
  isLoading2 = true
  isLoading3 = true
  isLoading4 = true
  dataPhone:resPhoneInfo={
    country:"",
    phoneText:"",
    flag:"",
    operator:""
  };
  constructor(private utils:UtilitiesService) { }

  ngOnInit() {
    this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
    const time = timer(2000);
    const time2 = timer(4000);
    const time3 = timer(6000);
    const time4 = timer(9000);
    const navegar = timer(12000);
    time.subscribe(m=>{
      this.isLoading1=!this.isLoading1;
    })
    time2.subscribe(m=>{
      this.isLoading2=!this.isLoading2;
    })
    time3.subscribe(m=>{
      this.isLoading3=!this.isLoading3;
    })
    time4.subscribe(m=>{
      this.isLoading4=!this.isLoading4;
    })
    navegar.subscribe(m=>{
      this.utils.navigate("/pre-checkout");
    })
  }
}
