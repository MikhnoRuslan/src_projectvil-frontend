import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PageSettingsService } from "./page-settings.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { Observable } from "rxjs";
import { IPageResultDto } from "../../../shared/models/base/pageResult.model";
import { ICreateProjectInput, IProjectDto } from "../../../shared/models/project.model";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly gateway: string = '';
  private readonly entity: string = 'project';

  constructor(
    private http: HttpClient,
    private pageSettingsService: PageSettingsService
  ) {
    this.gateway = environment.issuer;
  }

  get(id: string): Observable<IProjectDto> {
    const url = `${this.gateway}/${this.entity}/${id}`;

    return this.http.get<IProjectDto>(url)
  }

  getList(data: IPagedAndSortiedAndFilteredRequestInput): Observable<IPageResultDto<IProjectDto>> {
    const params = this.pageSettingsService.createParams(data);
    const url = `${this.gateway}/${this.entity}/projects`;

    return this.http.get<IPageResultDto<IProjectDto>>(url, {params});
  }

  create(input: ICreateProjectInput): Observable<IProjectDto> {
    const url = `${this.gateway}/${this.entity}/create-project`;

    return this.http.post<IProjectDto>(url, input);
  }
}
