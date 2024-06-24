import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isOpen: boolean = false;

  @Output() isCloseMenu = new EventEmitter<boolean>()

  constructor(
    private authService: AuthService
  ) {
  }

  rotateButton() {
    this.isOpen = !this.isOpen;
    this.isCloseMenu.emit(this.isOpen);
  }

  logout(): void {
    this.authService.logout();
  }
}
