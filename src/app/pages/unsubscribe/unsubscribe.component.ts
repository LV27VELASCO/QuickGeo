import { Component, inject } from '@angular/core';
import { LocateCardComponent } from '../../components/locate-card/locate-card.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Unsubscribe } from '../../../Interface/models';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-unsubscribe',
  standalone: true,
  imports: [LocateCardComponent,FooterComponent,TranslateModule,ReactiveFormsModule,FormsModule],
  templateUrl: './unsubscribe.component.html'
})
export class UnsubscribeComponent {

  fb = inject(FormBuilder);
  api = inject(ApiService);
  successMsg: string = '';
  errorMsg: string = '';
  load:boolean=false;

  formUnsusbcribe:FormGroup=this.fb.group({
     email:['', [Validators.required, Validators.email]]
    })

  ngOnInit() {
    if (typeof window !== 'undefined'){
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit(){
    this.load=true;
    if(this.formUnsusbcribe.valid){
      const reqData: Unsubscribe = {
              email:this.formUnsusbcribe.get("email")?.value
            };
      this.api.Unsusbscribe(reqData).subscribe({
        next: (data) => {
          //Exito
          this.load = false;
          this.successMsg = data.message;
          this.formUnsusbcribe.reset();

        // Ocultar el mensaje de éxito después de 3 segundos
        setTimeout(() => this.successMsg = '', 3000);
        },
        error: (err) => {
          //error
          this.load = false;
          if (err.status === 404) {
            this.errorMsg = "Email no cuenta con subscripción activa";
          }else {
            this.errorMsg = "Ocurrió un error al procesar la solicitud. Intenta nuevamente.";
          }
          // Ocultar el mensaje de error después de 3 segundos
          setTimeout(() => this.errorMsg = '', 3000);
        }
      });
    } else {
      this.load = false;
      this.errorMsg = "Por favor, ingresa un correo válido.";
      setTimeout(() => this.errorMsg = '', 3000);
    }
  }



}
