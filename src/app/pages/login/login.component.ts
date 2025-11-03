import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Login, ResetPsw } from '../../../Interface/models';
import { ApiService } from '../../services/api.service';
import { UtilitiesService } from '../../services/utilities.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslateModule,ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  testimonios =[true,false,false];
  recoveryPassword = false;
  password = false;
  load=false;
  successMsg: string = '';
  errorMsg: string = '';
  fb = inject(FormBuilder);
  api = inject(ApiService);
  utils = inject(UtilitiesService);
  buttonLogin:boolean = true;

  formLogin:FormGroup=this.fb.group({
      email:['', [Validators.email, Validators.required]],
      password:['', [Validators.required]]
    })

  formReset:FormGroup=this.fb.group({
      email:['', [Validators.email, Validators.required]],
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
                   this.navegar('/dashboard')
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

  onResetPsw(){
    this.load=true;
        if(this.formReset.valid){
          const reqData: ResetPsw = {
                  email:this.formReset.get("email")?.value
                };
          this.api.ResetPsw(reqData).subscribe({
            next: (data) => {
              //Exito
              this.load = false;
              this.successMsg = data.message;
              this.formReset.reset();

            // Ocultar el mensaje de éxito después de 3 segundos
            setTimeout(() => this.successMsg = '', 3000);
            },
            error: (err) => {
              //error
              this.load = false;
              if (err.status === 404) {
                this.errorMsg = "Incorrect email or password.";
              }else {
                this.errorMsg = "An error occurred. Please try again.";
              }
              // Ocultar el mensaje de error después de 3 segundos
              setTimeout(() => this.errorMsg = '', 3000);
            }
          });
        } else {
          this.load = false;
          this.errorMsg = "Please enter a valid email address.";
          setTimeout(() => this.errorMsg = '', 3000);
        }
  }

  navegar(ruta: string): void {
    // Cierra el menú si está abierto

    // Llamamos a UtilsService para navegar
    this.utils.navigate(ruta)
      .then(() => {
        // Scroll suave al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .catch(err => console.error('Navigation error:', err));
  }

}
