import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IResetPasswordInput } from "../../../shared/models/auth/IResetPasswordInput";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private readonly gateway: string = '';

  constructor(private http: HttpClient) {
    this.gateway = environment.issuer;
  }

  resetPassword(input: IResetPasswordInput) : Observable<void> {
    return this.http.post<void>(`${this.gateway}/user/reset-password`, input)
  }
}
