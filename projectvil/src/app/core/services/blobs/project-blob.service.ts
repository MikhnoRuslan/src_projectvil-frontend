import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AppConfig} from "../../../../config/config";
import {Project_Service} from "../../../shared/constants/service.url.constants";

@Injectable({
  providedIn: 'root'
})export class ProjectBlobService {
  private gateway = AppConfig.url;
  private entity = 'petprojectblob';

  constructor(
    private http: HttpClient
  ) {
  }

  get(id: string): Observable<any> {
    const url = `${this.gateway}/${Project_Service}/${this.entity}/get`;
    const params = { id };
    return this.http.get<any>(url, {params})
  }

  create(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${this.gateway}/${Project_Service}/${this.entity}/create`;

    return this.http.post<any>(url, formData);
  }
}
