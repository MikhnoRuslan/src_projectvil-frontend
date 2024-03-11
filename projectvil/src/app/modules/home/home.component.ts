import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LanguageComponent} from "../../shared/components/language/language.component";
import {TranslateModule} from "@ngx-translate/core";
import {DropdownComponent} from "../../shared/components/dropdown/dropdown.component";
import {IDomainDto} from "../../../shared/models/domain/domain-dto.model";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import {IPageResultDto} from "../../../shared/models/base/pageResult.model";
import {DomainService} from "../../core/services/domain.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
      RouterOutlet,
      RouterLink,
      RouterLinkActive,
      LanguageComponent,
      TranslateModule,
      DropdownComponent,
      FormsModule
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  domains: IDomainDto [] = [];
  domainId: string = '';

  constructor(
    private router: Router,
    private domainService: DomainService) {

  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToAnchor();
      }
    });

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
        }
      });
  }

  test() {
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
        }
      });
  }

  scrollToAnchor(): void {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  goHome() {
    console.log("works")
    this.router.navigate(["/home"]);
  }

  enter() {
    console.log("works")
    this.router.navigate(["/login"]);
  }

  registration() {
    console.log("works")
    this.router.navigate(["/registration"]);
  }

  menu() {
    console.log("works")
  }
}
