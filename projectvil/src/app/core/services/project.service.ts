import { Injectable } from "@angular/core";
import { AppConfig } from "../../../config/config";
import { HttpClient } from "@angular/common/http";
import { PageSettingsService } from "./page-settings.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { Observable } from "rxjs";
import { IPageResultDto } from "../../../shared/models/base/pageResult.model";
import { ICreateProjectInput, IProjectDto } from "../../../shared/models/project.model";
import { Project_Service } from "../../shared/constants/service.url.constants";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private gateway = AppConfig.url;
  private entity = 'project';

  constructor(
    private http: HttpClient,
    private pageSettingsService: PageSettingsService
  ) {
  }

  getList(data: IPagedAndSortiedAndFilteredRequestInput): Observable<IPageResultDto<IProjectDto>> {
    const params = this.pageSettingsService.createParams(data);
    const url = `${this.gateway}/${Project_Service}/${this.entity}/projects`;

    return this.http.get<IPageResultDto<IProjectDto>>(url, {params});
  }

  create(input: ICreateProjectInput): Observable<IProjectDto> {
    const url = `${this.gateway}/${Project_Service}/${this.entity}/create-project`;

    return this.http.post<IProjectDto>(url, input);
  }
}
