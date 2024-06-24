import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { IDomainInput } from "../../../shared/models/domain/domain-input.model";
import { PageSettingsService } from "./page-settings.service";
import { IPageResultDto } from "../../../shared/models/base/pageResult.model";
import { IDomainDto } from "../../../shared/models/domain/domain-dto.model";
import { Project_Service } from "../../shared/constants/service.url.constants";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private readonly gateway: string = '';
  private entity = 'domain';

  constructor(
    private http: HttpClient,
    private pageSettingsService: PageSettingsService
  ) {
    this.gateway = environment.url;
  }

  get(data: IDomainInput) : Observable<IPageResultDto<IDomainDto>> {
    const params = this.pageSettingsService.createParams(data);
    const url = `${this.gateway}/${Project_Service}/${this.entity}/domains`;

    return this.http.get<IPageResultDto<IDomainDto>>(url, { params })
      .pipe(
        map((response: IPageResultDto<IDomainDto>) => response)
      );
  }
}
