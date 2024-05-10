import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import {  MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { map, Observable, Subscription } from "rxjs";
import { IPageResultDto } from "../../../../shared/models/base/pageResult.model";
import { IDomainDto } from "../../../../shared/models/domain/domain-dto.model";
import { AppConfig } from "../../../../config/config";
import { PageSettingsService } from "../../../core/services/page-settings.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { HttpClient } from "@angular/common/http";
import { LanguageComponent } from "../language/language.component";
import { LanguageChangeService } from "../../../core/services/language-changes.service";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TranslateModule,
    NgIf,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    LanguageComponent
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent implements OnInit, OnDestroy {
  @Input() textField: string = '';
  @Input() valueField: string = '';
  @Input() serviceName: string = '';
  @Input() entity: string = '';
  @Input() load: boolean = false;

  @Output() valueChange = new EventEmitter<any>();
  languageSubscription$!: Subscription;

  selectedValue: string = '';
  private gateway = AppConfig.url;
  protected data: { [key: string]: any }[] = [];

  private input: IPagedAndSortiedAndFilteredRequestInput = {
    filter: undefined,
    sort: undefined,
    skip: 0,
    maxResultCount: 50
  };

  constructor(
    private pageSettingsService: PageSettingsService,
    private http: HttpClient,
    private languageChangeService: LanguageChangeService) {
  }

  ngOnInit(): void {
    this.getData(this.input).subscribe(result => {
      if (result) {
        this.data = result.items
      }
    })

    this.subscribeLanguageChanges();
  }

  ngOnDestroy(): void {
    this.languageSubscription$.unsubscribe();
  }

  subscribeLanguageChanges():void {
    this.languageSubscription$ = this.languageChangeService.languageChanged$.subscribe(() => {
      this.getData(this.input).subscribe(result => {
        this.data = result.items
      })
    });
  }

  onValueChange() {
    this.valueChange.emit(this.selectedValue);
  }

  private getData(data: IPagedAndSortiedAndFilteredRequestInput) : Observable<IPageResultDto<any>> {
    const params = this.pageSettingsService.createParams(data);
    const url = `${this.gateway}/${this.serviceName}/${this.entity}`;

    return this.http.get<IPageResultDto<IDomainDto>>(url, { params })
      .pipe(
        map((response: IPageResultDto<IDomainDto>) => response)
      );
  }
}
