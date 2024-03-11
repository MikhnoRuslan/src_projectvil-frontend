import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastr: ToastrService) { }

  error(error: string) {
    this.toastr.error(error);
  }

  success(success: string) {
    this.toastr.success(success);
  }

  info(info: string) {
    this.toastr.info(info);
  }

  warning(warning: string) {
    this.toastr.warning(warning);
  }
}
