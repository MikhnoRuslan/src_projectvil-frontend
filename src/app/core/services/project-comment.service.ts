import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ICreateProjectCommentInput } from "../../../shared/models/project.model";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectCommentService {
  private readonly gateway: string = '';
  private readonly entity: string = 'projectcomment';

  constructor(
    private http: HttpClient
  ) {
    this.gateway = environment.issuer;
  }

  create(input: ICreateProjectCommentInput): Observable<any> {
    const url = `${this.gateway}/${this.entity}/create-comment`;

    return this.http.post<any>(url, input);
  }
}
