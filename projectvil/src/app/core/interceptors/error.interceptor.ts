import { inject } from '@angular/core';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
import { MessageService } from "../services/message.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "../services/local-storage.service";
import { Access_token } from "../../shared/constants/constants";
import { AuthService } from "../services/auth.service";

export const errorInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next : HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);
  const route: Router = inject(Router);
  const localstorageService = inject(LocalStorageService);
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status === 401) {
        localstorageService.removeItem(Access_token);
        localstorageService.removeItem('refresh_token');
        authService.isAuthenticated.next(false);

        route.navigate(['/login'])
          .then(() => messageService.info("login"))

        return throwError(() => error);
      }

      if (error.error.error) {
        messageService.error(error.error.error_description);
      } else {
        messageService.error(error.error);
      }

      return throwError(() => error);
    })
  );
}
