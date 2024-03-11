import { inject } from '@angular/core';
import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
import { MessageService } from "../services/message.service";

export const errorInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next : HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);

      if (error.error.error) {
        console.log(error);
        messageService.error(error.error.error_description);
      } else {
        messageService.error(error.error);
      }

      return throwError(() => error);
    })
  );
}
