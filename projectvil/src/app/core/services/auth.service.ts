import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from "../../../config/config";
import {BehaviorSubject} from 'rxjs';
import {MessageService} from "./message.service";
import {LocalStorageService} from "./local-storage.service"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authServerUrl = AppConfig.issuer;
  private tokenEndpoint = `${this.authServerUrl}/connect/token`;
  private clientId = AppConfig.clientId;
  private redirectUri = `${AppConfig.baseUrl}/callback`;
  private logoutUri = AppConfig.baseUrl;
  private scopes = AppConfig.scope;
  private secret = AppConfig.secret;

  private accessToken: string;
  private refreshToken: string;
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService,
    private localStorage: LocalStorageService) {
    this.accessToken = '';
    this.refreshToken = '';
  }

  login(username: string, password: string) {
    const tokenEndpoint = `${this.authServerUrl}/connect/token`;
    const payload = new URLSearchParams();
    payload.set('grant_type', 'password');
    payload.set('client_id', this.clientId);
    payload.set('scope', this.scopes);
    payload.set('client_secret', this.secret);
    payload.set('username', username);
    payload.set('password', password);

    this.http.post(tokenEndpoint, payload.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).subscribe({
      next: (response: any) => {
        console.log('Request successful:', response);
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh_token;
        this.localStorage.setItem('access_token', this.accessToken);
        this.localStorage.setItem('refresh_token', this.refreshToken);
        this.isAuthenticated.next(true);
        this.router.navigate(['home'])
          .then(() => this.messageService.info("Works"));
      },
      complete: () => {
        console.log('Request completed');
      }
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isAuthenticated.next(false);
    window.location.href = this.authServerUrl + '/connect/endsession' +
      '?id_token_hint=' + localStorage.getItem('id_token') +
      '&post_logout_redirect_uri=' + this.logoutUri;
  }

  getAccessToken() {
    if (!this.accessToken) {
      this.accessToken = <string>localStorage.getItem('access_token');
    }
    return this.accessToken;
  }

  getIsAuthenticated() {
    return this.isAuthenticated.asObservable();
  }
}
