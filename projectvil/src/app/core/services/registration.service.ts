import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../../../config/config";
import { Identity_Service } from "../../shared/constants/service.url.constants";
import { IUserRegistrationModel } from "../../../shared/models/auth/registration/user.registration.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }
  private gateway = AppConfig.url;

  create(user: IUserRegistrationModel) : Observable<void> {
    return this.http.post<void>(`${this.gateway}/${Identity_Service}/identity/create`, user);
  }
}
