import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {ROUTES} from "../../shared/constants/routes";
import {IAuthModel} from "../../../shared/models/auth/auth.model";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, TranslateModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent{
  registration = '/' + ROUTES.registration;
  forgetPassword = '/' + ROUTES.forgetPassword;

  constructor(private authService : AuthService, private router: Router) {}
  showPassword: boolean = false;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  onSubmit() {
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    const {
      email,
      password
    } = this.form.getRawValue();

    const input = {
      email,
      password
    } as IAuthModel;

    this.authService.login(input);
  }
}
