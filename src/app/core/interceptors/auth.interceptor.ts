import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Access_token } from "../../shared/constants/constants";
import { inject } from "@angular/core";
import { LocalStorageService } from "../services/local-storage.service";
import { Authorization } from "../../shared/constants/service.url.constants";

export const authInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next : HttpHandlerFn) => {
  const localStorageService: LocalStorageService = inject(LocalStorageService);
  const jwtToken = 'Bearer ' + localStorageService.getItem(Access_token);

  if(jwtToken) {
    req = req.clone({
      headers: req.headers.set(Authorization, jwtToken)
    });
  }

  return next(req);
}
