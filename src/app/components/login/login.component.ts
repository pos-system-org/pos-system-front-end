import { Component } from '@angular/core';
import {AuthService} from "../../../services/auth-service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  imgUrl="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
  constructor(private authService:AuthService,private router:Router) {
  }
  form=new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });
  formSubmit() {
    this.authService.login(this.form.get('email')?.value, this.form.get('password')?.value).then(result=>{
      this.router.navigate(['/dashboard'])
    })
  }

}
