import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { resPhoneInfo } from '../../../Interface/models';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaymentFormComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

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
      const data =this.utils.getItem("data");
      if (typeof window !== 'undefined'){
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if(data){
        this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
      }else{
        this.utils.navigate("/")
      }
    }

}
