import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUserRegistrationModel } from "../../../shared/models/auth/registration/user.registration.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly gateway: string = '';

  constructor(private http: HttpClient) {
    this.gateway = environment.issuer;
  }

  create(user: IUserRegistrationModel) : Observable<void> {
    return this.http.post<void>(`${this.gateway}/user/create`, user);
  }
}
