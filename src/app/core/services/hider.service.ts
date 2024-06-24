import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HiderService {
  hiderChanged$: Subject<boolean> = new Subject<boolean>();

  constructor() { }
}
