import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageChangeService {
  languageChanged$: Subject<void> = new Subject<void>();

  constructor() { }
}
