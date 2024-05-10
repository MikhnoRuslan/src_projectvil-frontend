import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IResetPasswordInput } from "../../../../shared/models/auth/IResetPasswordInput";
import { ForgetPasswordService } from "../../../core/services/forget-password.service";
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MessageService} from "../../../core/services/message.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-forget-password',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterOutlet,
        RouterLink,
        RouterLinkActive,
        TranslateModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  form = new FormGroup({
    email: new FormControl ('', Validators.required)
  });

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private messageService: MessageService,
    private translationService: TranslateService) {}

  submit() {
    if (!this.form.valid) {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field) as FormControl;
        control.markAsTouched({ onlySelf: true });
      });

      return;
    }

    const {
      email
    } = this.form.getRawValue();

    const resetPasswordInput = {
      email: email
    } as IResetPasswordInput;

    this.forgetPasswordService.resetPassword(resetPasswordInput)
      .subscribe({
        next: (response: any) => {
          this.router.navigate(["/login"])
            .then(() => this.messageService
              .info(this.translationService.instant('ForgetPassword:Notification:New-password')))
        }
      });
  }
}
