import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})export class ProjectBlobService {
  private readonly gateway: string = '';
  private entity = 'projectblob';

  constructor(
    private http: HttpClient
  ) {
    this.gateway = environment.issuer;
  }

  get(id: string): Observable<any> {
    const url = `${this.gateway}/${this.entity}/get`;
    const params = { id };
    return this.http.get<any>(url, {params})
  }

  create(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.gateway}/${this.entity}/create`;

    return this.http.post<any>(url, formData);
  }
}
