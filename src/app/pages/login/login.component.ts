import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Login } from '../../../Interface/models';
import { ApiService } from '../../services/api.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,TranslateModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  testimonios =[true,false,false];
  recoveryPassword = false;
  password = false;
  fb = inject(FormBuilder);
  api = inject(ApiService);
  utils = inject(UtilitiesService);
  buttonLogin:boolean = true;

  formLogin:FormGroup=this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    })
  

  prevCard(){
    let currentIndex = this.testimonios.indexOf(true); // Encuentra el índice del valor `true`
    // Si hay un `true`, cámbialo a `false` y pasa al índice anterior
    if (currentIndex !== -1) {
      this.testimonios[currentIndex] = false;
      let prevIndex = (currentIndex - 1 + this.testimonios.length) % this.testimonios.length; // Cicla al final si llega al inicio
      this.testimonios[prevIndex] = true;
    } else {
      this.testimonios[this.testimonios.length - 1] = true; 
    }
  }

  nextCard(){
    let currentIndex = this.testimonios.indexOf(true); 
    if (currentIndex !== -1) {
      this.testimonios[currentIndex] = false;
      let nextIndex = (currentIndex + 1) % this.testimonios.length;
      this.testimonios[nextIndex] = true;
    } else {
      this.testimonios[0] = true; 
    }
  }

  showRecoveryPassword(){
    this.recoveryPassword = !this.recoveryPassword
  }

  showPassword(){
    this.password = !this.password
  }

  onSubmit(){
    if(this.formLogin.valid){
      this.buttonLogin = false;
      const reqData: Login = {email:this.formLogin.get("email")?.value, password:this.formLogin.get("password")?.value};
      this.api.LoginUser(reqData).subscribe({
                  next: (data) => {
                   this.utils.saveCookie('access_token',data.token);
                   this.utils.navigate('dashboard')
                   this.buttonLogin = true;
                  },
                  error: (err) => {
                    this.formLogin.reset();
                    this.formLogin.controls['email'].setErrors({'fail': true});
                    this.formLogin.controls['password'].setErrors({'fail': true});
                    this.buttonLogin = true;
                  }
                });
    }else{
      this.formLogin.controls['email'].setErrors({'incorrect': true});
      this.formLogin.controls['password'].setErrors({'incorrect': true});
    }
  }

}
