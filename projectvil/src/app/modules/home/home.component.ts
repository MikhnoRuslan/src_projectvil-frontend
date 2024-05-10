import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LanguageComponent} from "../../shared/components/language/language.component";
import {TranslateModule} from "@ngx-translate/core";
import {DropdownComponent} from "../../shared/components/dropdown/dropdown.component";
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

  constructor(
    private router: Router) {
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToAnchor();
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
    this.router.navigate(["/home"]);
  }

  enter() {
    this.router.navigate(["/login"]);
  }

  registration() {
    this.router.navigate(["/registration"]);
  }

  menu() {
  }
}
