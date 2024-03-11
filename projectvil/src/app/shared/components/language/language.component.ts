import { Component } from '@angular/core';
import { SessionStorage } from "../../../core/services/session-storage";
import {NgClass} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import { LanguageHeaderName } from "../../constants/service.url.constants";

@Component({
  selector: 'app-language',
  standalone: true,
  imports: [ NgClass ],
  templateUrl: './language.component.html',
  styleUrl: './language.component.scss'
})
export class LanguageComponent {
  isDropdownOpen: boolean = false;

  constructor(
    private sessionStorage: SessionStorage,
    private translationService: TranslateService) {
  }

  setLanguage(language: string) {
    this.sessionStorage.setItem(LanguageHeaderName, language);
    this.translationService.use(language);
    this.closeDropdown();
  }

  openDropdown() {
    this.isDropdownOpen = true;
  }

  closeDropdown() {
    this.isDropdownOpen = false
  }
}
