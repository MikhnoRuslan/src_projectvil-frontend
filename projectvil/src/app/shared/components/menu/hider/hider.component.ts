import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { LanguageComponent } from "../../language/language.component";
import { AuthService } from "../../../../core/services/auth.service";
import { ROUTES } from "../../../constants/routes";
import { NgIf, NgStyle, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: 'app-hider',
  standalone: true,
  imports: [
    TranslateModule,
    LanguageComponent,
    NgIf,
    NgTemplateOutlet,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgStyle
  ],
  templateUrl: './hider.component.html',
  styleUrl: './hider.component.scss'
})
export class HiderComponent {
  @Input() isCommon: boolean = false;
  @Input() isHome: boolean = false;

  home = ROUTES.home;

  constructor(
    private router: Router,
    public authService: AuthService,
  ) {
  }

  goToCreateProj(): void  {
    this.router.navigate(['/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.create]);
  }

  logout(): void {
    this.authService.logout();
  }

  getNotification(): void {
    console.log("notification works")
  }

  goToHomePage(): void {
    this.router.navigate(['/' + ROUTES.home]);
  }

  enter() {
    this.router.navigate([ROUTES.login]);
  }

  registration() {
    this.router.navigate([ROUTES.registration]);
  }

  goToPersonalInfo(): void {
    this.router.navigate([ROUTES.personArea + '/' + ROUTES.personalInfo]);
  }

  scrollTo(section: string): void {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }
}
