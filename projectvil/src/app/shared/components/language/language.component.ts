import { Component } from '@angular/core';
import { SessionStorage } from "../../../core/services/session-storage";
import { NgClass } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { LanguageHeaderName } from "../../constants/service.url.constants";
import { DropdownComponent } from "../dropdown/dropdown.component";
import {Subject} from "rxjs";
import {LanguageChangeService} from "../../../core/services/language-changes.service";

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  isDropdownOpen: boolean = false;
  isChanged: boolean = false;
  languageChanged$: Subject<void> = new Subject<void>()

  constructor(
    private sessionStorage: SessionStorage,
    private translationService: TranslateService,
    private languageChangeService: LanguageChangeService) {
  }

  setLanguage(language: string) {
    this.sessionStorage.setItem(LanguageHeaderName, language);
    this.translationService.use(language);

    this.languageChangeService.languageChanged$.next();

    this.closeDropdown();
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false
  }
}
