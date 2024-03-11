import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslateModule, NgIf],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  isOpen: boolean = false;

  rotateButton() {
    this.isOpen = !this.isOpen;
  }
}
