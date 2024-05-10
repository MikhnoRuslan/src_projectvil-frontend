import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaginationChangesServiceService {

  paginationChanged$: Subject<number> = new Subject<number>();

  constructor() { }
}
