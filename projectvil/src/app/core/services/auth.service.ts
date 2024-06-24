import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { MessageService } from "./message.service";
import { LocalStorageService } from "./local-storage.service"
import { Access_token, IsAuthenticated, Refresh_token } from "../../shared/constants/constants";
import { jwtDecode } from "jwt-decode";
import { ROUTES } from "../../shared/constants/routes";
import { environment } from "../../../environments/environment";
import {IAuthModel, IAuthorizationDto} from "../../../shared/models/auth/auth.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authServerUrl: string = '';
  private readonly clientId: string = '';
  private readonly scopes: string = '';
  private readonly secret: string = '';
  private readonly logoutUri: string = '';
  private accessToken: string;
  private refreshToken: string;
  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private localStorage: LocalStorageService
  ) {
    this.accessToken = '';
    this.refreshToken = '';
    this.authServerUrl = environment.issuer;
    this.logoutUri = environment.baseUrl;
  }

  /*login(username: string, password: string) {
    const payload = new URLSearchParams();
    payload.set('username', username);
    payload.set('password', password);

    this.http.post(`${this.authServerUrl}/authservice/login`, payload.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe({
      next: (response: any) => {
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.localStorage.setItem('Access_token', this.accessToken);
        this.localStorage.setItem('Refresh_token', this.refreshToken);
        this.localStorage.setItem('IsAuthenticated', 'true')
        this.isAuthenticated.next(true);
        this.router.navigate(['/' + ROUTES.home]);
      },
      error: (error: any) => {
        console.error('Login error', error);
        // Дополнительная обработка ошибок, если необходимо
      },
      complete: () => {
      }
    });
  }*/

  login(input: IAuthModel) {
    const url = `${this.authServerUrl}/authservice/login`;

    this.http.post<IAuthorizationDto>(url, input).subscribe(res => {
      this.accessToken = res.accessToken;
      this.refreshToken = res.refreshToken;
      this.localStorage.setItem(Access_token, this.accessToken);
      this.localStorage.setItem(Refresh_token, this.refreshToken);
      this.localStorage.setItem(IsAuthenticated, 'true')
      this.isAuthenticated.next(true);
      this.router.navigate(['/' + ROUTES.home]);
    })
  }

  logout() {
    this.localStorage.removeItem(Access_token);
    this.localStorage.removeItem(Refresh_token);
    this.localStorage.removeItem(IsAuthenticated);

    this.isAuthenticated.next(false);
    window.location.href = this.logoutUri + '/' + ROUTES.home;
  }

  getAccessToken() {
    if (!this.accessToken) {
      this.accessToken = <string>localStorage.getItem(Access_token);
    }
    return this.accessToken;
  }

  getIsAuthenticated() {
    return this.localStorage.getItem(IsAuthenticated) === 'true';
  }

  getCurrentUserId(): string | null {
    const token = this.localStorage.getItem(Access_token);

    if (token) {
      const decoded = jwtDecode(token) as any;
      return decoded.userId;
    }

    return null;
  }

  getCurrentUserName(): string | null {
    const token = this.localStorage.getItem(Access_token);

    if (token) {
      const decoded = jwtDecode(token) as any;
      return decoded.userName;
    }

    return null;
  }
}
