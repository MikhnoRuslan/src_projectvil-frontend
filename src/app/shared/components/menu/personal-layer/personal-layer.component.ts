import { Component } from '@angular/core';
import {MenuComponent} from "../menu.component";
import {RouterOutlet} from "@angular/router";
import {HiderComponent} from "../hider/hider.component";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-personal-layer',
  standalone: true,
  imports: [
    MenuComponent,
    RouterOutlet,
    HiderComponent,
    NgIf,
    NgStyle
  ],
  templateUrl: './personal-layer.component.html',
  styleUrl: './personal-layer.component.scss'
})
export class PersonalLayerComponent {
  isMenuOpen: boolean = false;

  isOpen(input: any): void {
    this.isMenuOpen = input;
  }
}
