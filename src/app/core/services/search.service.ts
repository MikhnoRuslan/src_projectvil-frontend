import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchChanged$: Subject<string> = new Subject<string>();
  countChanged$: Subject<number> = new Subject<number>()

  constructor() { }
}
