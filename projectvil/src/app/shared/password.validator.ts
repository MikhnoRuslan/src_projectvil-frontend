import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const value: string = control.value;

    if (value.length < 8) {
      return { 'passwordLength': true };
    }

    if (!/[A-Z]/.test(value)) {
      return { 'passwordUpperCase': true };
    }

    if (!/\d/.test(value)) {
      return { 'passwordNumber': true };
    }

    if (!/[^a-zA-Z0-9]/.test(value)) {
      return { 'passwordSpecialCharacter': true };
    }

    return null;
  };
}

export function repeatPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const password: string = control.get("password")?.value;
    const repeatPassword: string = control.get("repeatPassword")?.value;

    return password === repeatPassword ? null : {'confirmPassword': true};
  };
}
