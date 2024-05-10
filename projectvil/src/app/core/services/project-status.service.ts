import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Project_Service } from "../../shared/constants/service.url.constants";
import { PageSettingsService } from "./page-settings.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { AppConfig } from "../../../config/config";
import { IPageResultDto } from "../../../shared/models/base/pageResult.model";
import { IStatusDto } from "../../../shared/models/status/status-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectStatusService {
  private gateway = AppConfig.url;
  private entity = 'status';

  constructor(
    private http: HttpClient,
    private pageSettingsService: PageSettingsService
  ) { }

  get(data: IPagedAndSortiedAndFilteredRequestInput) : Observable<IPageResultDto<IStatusDto>> {
    const params = this.pageSettingsService.createParams(data);
    const url = `${this.gateway}/${Project_Service}/${this.entity}/statuses`;

    return this.http.get<IPageResultDto<IStatusDto>>(url, { params });
  }
}
