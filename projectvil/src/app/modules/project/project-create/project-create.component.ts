import {Component, OnInit} from '@angular/core';
import {DropdownComponent} from "../../../shared/components/dropdown/dropdown.component";
import {DomainService} from "../../../core/services/domain.service";
import {MessageService} from "../../../core/services/message.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import {FormsModule} from "@angular/forms";
import {IPageResultDto} from "../../../../shared/models/base/pageResult.model";
import {IDomainDto} from "../../../../shared/models/domain/domain-dto.model";

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    DropdownComponent,
    FormsModule
  ],
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.scss'
})

export class ProjectCreateComponent implements OnInit {
  domains: IDomainDto [] = [];
  domainId: string = '';

  constructor(
    private domainService: DomainService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    const request: IPagedAndSortiedAndFilteredRequestInput = {
      filter: '',
      sort: '',
      skip: 1,
      maxResultCount: 10
    };

    this.domainService.get(request)
      .subscribe({
        next: (data: IPageResultDto<IDomainDto>) => {
          this.domains = data.items
        },
        error: (error: string) => {
          this.messageService.error(error);
        }
      });
  }
}
