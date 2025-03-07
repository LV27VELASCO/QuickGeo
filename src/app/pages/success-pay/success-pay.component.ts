import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilitiesService } from '../../services/utilities.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CreateUser } from '../../../Interface/models';

@Component({
  selector: 'app-succes-pay',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './success-pay.component.html',
})
export class SuccessPayComponent {

  session_id: string | null = null;

  fb = inject(FormBuilder);
  utils = inject(UtilitiesService);
  api = inject(ApiService);
  route = inject(ActivatedRoute);
  message=""
  
  formPassword:FormGroup=this.fb.group({
    password:['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}')]],
  })

  ngOnInit(){
    this.session_id = this.route.snapshot.queryParamMap.get('session_id');
    if(!this.session_id){
      this.utils.navigate("/")
    }else{
      this.createUser(this.session_id)
    }
  }

  createUser(sessionID:string){
    const reqData: CreateUser = {session_id:sessionID};
    this.api.CreateUser(reqData).subscribe({
                next: (data) => {
                  this.message ='Te enviamos tus credenciales al correo proporcionado para el pago, disfruta FullGeo!';
                },
                error: (err) => {
                  this.message ='Ocurrió un error al enviar tus credenciales, por favor contactarte con soporte';
                }
              });
  }

  onSubmit(){
    
    if(this.formPassword.valid){
      
      
      
    }else{
      this.formPassword.controls['password'].setErrors({'incorrect': true})
    }
  }

}
