import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../../../config/config";
import { Observable } from "rxjs";
import { Identity_Service } from "../../shared/constants/service.url.constants";
import {IResetPasswordInput} from "../../../shared/models/auth/IResetPasswordInput";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  private gateway = AppConfig.url;

  resetPassword(input: IResetPasswordInput) : Observable<void> {
    return this.http.post<void>(`${this.gateway}/${Identity_Service}/identity/reset-password`, input)
  }
}
