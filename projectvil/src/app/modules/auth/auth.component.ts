import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AuthService } from "../../core/services/auth.service";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive, TranslateModule ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent{
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
    this.authService.login(<string>this.form.value.email, <string>this.form.value.password);
  }

  registration() {
    this.router.navigate(["/registration"]);
  }

  forgetPassword() {
    this.router.navigate(["forget-password"])
  }
}
