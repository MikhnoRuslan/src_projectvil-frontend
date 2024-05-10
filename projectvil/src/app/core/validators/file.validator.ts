import { AbstractControl, ValidatorFn } from '@angular/forms';

export function sizeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    if (file && file.size > 5 * 1024 * 1024) {
      return { 'fileSize': true };
    }

    return null;
  }
}

export function typeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const file = control.value;

    if (!file) {
      return null;
    }

    const allowedFormats = ['image/jpeg', 'image/png', 'image/svg+xml'];

    if (!allowedFormats.includes(file.type)) {
      return { 'invalidFormat': true };
    }

    return null;
  }
}
