import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  public formAuth: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  public msgError!: string

  constructor( private formBuilder: FormBuilder, private authService: AuthService){}


  public submitForm(){
    if(this.formAuth.valid){
      this.authService.singin({
        email: this.formAuth.value.email,
        password: this.formAuth.value.password
      }).subscribe({
        next: (res) => console.log(res),
        error: (err) => (this.msgError = err)
      })
    }
  }
}
