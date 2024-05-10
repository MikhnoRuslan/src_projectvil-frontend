import { Injectable } from '@angular/core';
import { IPagedAndSortiedAndFilteredRequestInput } from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PageSettingsService {

  constructor() { }

  createParams(requestDto: IPagedAndSortiedAndFilteredRequestInput): HttpParams {
    let params = new HttpParams();

    if (requestDto.sort !== null && requestDto.sort !== undefined && requestDto.sort !== '') {
      params = params.set('sort', requestDto.sort);
    }

    if (requestDto.filter !== null && requestDto.filter !== undefined && requestDto.filter !== '') {
      params = params.set('filter', requestDto.filter);
    }

    if (requestDto.skip !== null && requestDto.skip !== undefined && requestDto.skip >= 0) {
      params = params.set('skipCount', requestDto.skip);
    }

    if (requestDto.maxResultCount !== null && requestDto.maxResultCount !== undefined && requestDto.maxResultCount >= 0) {
      params = params.set('maxResultCount', requestDto.maxResultCount);
    }

    return params;
  }
}
