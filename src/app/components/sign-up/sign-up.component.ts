import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth-service/auth.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule, RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private authService:AuthService,private router:Router) {
  }
  imgUrl="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
  form=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  formSubmit() {
    this.authService.register(this.form.get('email')?.value, this.form.get('password')?.value).then(result=>{
      this.router.navigate(['/login'])
    })
  }
}
