import { inject } from '@angular/core';
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { SessionStorage } from "../services/session-storage";
import { DefaultLanguage, LanguageHeaderName } from "../../shared/constants/service.url.constants";

export const languageInterceptor: HttpInterceptorFn = (req : HttpRequest<any>, next : HttpHandlerFn) => {
  const sessionStorage: SessionStorage = inject(SessionStorage);

  let language = DefaultLanguage;

  if (typeof window !== 'undefined') {
    language = sessionStorage.getItem(LanguageHeaderName) || DefaultLanguage;
  }

  const clone = req.clone({
    headers: req.headers.set(LanguageHeaderName, language)
  });

  return next(clone);
}
