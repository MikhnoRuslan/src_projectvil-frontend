import { Component } from '@angular/core';
import { MenuComponent } from "../menu.component";
import { RouterOutlet } from "@angular/router";
import {HiderComponent} from "../hider/hider.component";

@Component({
  selector: 'app-menu-layer',
  standalone: true,
    imports: [
        MenuComponent,
        RouterOutlet,
        HiderComponent
    ],
  templateUrl: './menu-layer.component.html',
  styleUrl: './menu-layer.component.scss'
})
export class MenuLayerComponent {

}
