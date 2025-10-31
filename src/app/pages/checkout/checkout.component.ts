import { Component } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { resPhoneInfo } from '../../../Interface/models';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [PaymentFormComponent, TranslateModule],
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
        // Espera a que el DOM esté listo y luego hace scroll al formulario
        setTimeout(() => {
          const formElement = document.querySelector('#payment-form');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            // Si no existe el formulario, hace scroll arriba
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 300); // pequeño delay para asegurar que el DOM cargue
      }
      if(data){
        this.dataPhone = JSON.parse(this.utils.getItem("data")) as resPhoneInfo;
      }else{
        this.utils.navigate("/")
      }
    }

}
