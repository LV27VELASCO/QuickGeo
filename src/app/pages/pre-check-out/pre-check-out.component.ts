import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { resPhoneInfo } from '../../../Interface/models';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-pre-check-out',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pre-check-out.component.html',
  styleUrl: './pre-check-out.component.css'
})
export class PreCheckOutComponent {

  dataPhone:resPhoneInfo={
    country:"",
    phoneText:"",
    flag:"",
    operator:""
  };
  constructor(private utils:UtilitiesService) { }

  ngOnInit() {
    const data =this.utils.getItem("data");
    if(data){
      this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
    }else{
      this.utils.navigate("/")
    }
    
  }
}
