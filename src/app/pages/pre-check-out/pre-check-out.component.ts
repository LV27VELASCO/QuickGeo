import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { resPhoneInfo } from '../../../Interface/models';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pre-check-out',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './pre-check-out.component.html',
  styleUrl: './pre-check-out.component.css'
})
export class PreCheckOutComponent {

  currentRoute:string ='';

  dataPhone:resPhoneInfo={
    country:'',
    phoneText:'',
    flag:'',
    operator:'',
    date:''
  };

  constructor( private utils:UtilitiesService, private http: HttpClient, private router: Router ) {
    this.currentRoute = this.router.url;
  }


  buttonLocation:boolean=true;

  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const data =this.utils.getItem("data");
    if(data){
      this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
    }else{
      this.utils.navigate("/")
    }
  }

}
