import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgIf, NgStyle } from "@angular/common";
import { NgClass } from "@angular/common";
import { passwordValidator, repeatPasswordValidator } from "../../../shared/password.validator";
import { IUserRegistrationModel } from "../../../../shared/models/auth/registration/user.registration.model";
import { RegistrationService } from "../../../core/services/registration.service";
import { MessageService } from "../../../core/services/message.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      ReactiveFormsModule,
      FormsModule,
      NgIf,
      NgClass,
      NgStyle,
      TranslateModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})

export class RegistrationComponent {
  showPassword: boolean = false;

  constructor(
    private router: Router,
    private registrationService: RegistrationService,
    private messageService: MessageService,
    private translationService: TranslateService) {
  }

  form = new FormGroup({
    "userName": new FormControl("", Validators.required),
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "password": new FormControl("", [
      Validators.required,
      passwordValidator()
    ]),
    "repeatPassword": new FormControl("", [
      Validators.required,
    ])
  }, {validators: repeatPasswordValidator()});

  submit() {
    const {
      userName,
      email,
      password
    } = this.form.getRawValue();

    const userRegistrationInput = {
      userName,
      email,
      password
    } as IUserRegistrationModel;

    this.registrationService.create(userRegistrationInput)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(["/login"])
            .then(() => this.messageService.info(this.translationService.instant('Registration:Notification:Confirm')));
        }
      });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  registration() {
    this.router.navigate(["/login"]);
  }
}
