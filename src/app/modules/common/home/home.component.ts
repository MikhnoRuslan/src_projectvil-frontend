import {Component, HostListener} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { LanguageComponent } from "../../../shared/components/language/language.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { DropdownComponent } from "../../../shared/components/dropdown/dropdown.component";
import { FormsModule } from "@angular/forms";
import { ROUTES } from "../../../shared/constants/routes";
import { AuthService } from "../../../core/services/auth.service";
import { CommonLayerComponent } from "../../../shared/components/menu/common-layer/common-layer.component";
import { HiderService } from "../../../core/services/hider.service";
import { MessageService } from "../../../core/services/message.service";
import {NgIf} from "@angular/common";

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
    FormsModule,
    CommonLayerComponent,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  home = ROUTES.home;
  showScrollIndicator: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private hiderService: HiderService,
    private translationService: TranslateService,
    private messageService: MessageService
  ) {
  }

  goToCreateProject(): void {
    const isLogin = this.authService.getIsAuthenticated();
    if (isLogin) {
      this.router.navigate([ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.create])
    } else {
      this.router.navigate([ROUTES.login]).then(() => {
        this.messageService.info(this.translationService.instant('Info:CreateProject'))
      })
    }
  }

  goToFindProject() {
    this.hiderService.hiderChanged$.next(false);
    this.router.navigate([ROUTES.commonArea + '/' + ROUTES.findProject]);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 0) {
      this.showScrollIndicator = true;
    } else {
      this.showScrollIndicator = false;
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  enter() {
    this.router.navigate([ROUTES.login]);
  }

  registration() {
    this.router.navigate(["/registration"]);
  }
}
