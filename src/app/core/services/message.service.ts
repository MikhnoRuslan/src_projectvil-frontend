import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toaster: ToastrService) { }

  error(error: string) {
    this.toaster.error(error);
  }

  success(success: string) {
    this.toaster.success(success);
  }

  info(info: string) {
    this.toaster.info(info);
  }

  warning(warning: string) {
    this.toaster.warning(warning);
  }
}
