import { Component, OnInit } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { LanguageComponent } from "../../language/language.component";
import { LocalStorageService } from "../../../../core/services/local-storage.service";
import { AuthService } from "../../../../core/services/auth.service";

@Component({
  selector: 'app-hider',
  standalone: true,
  imports: [
    TranslateModule,
    LanguageComponent
  ],
  templateUrl: './hider.component.html',
  styleUrl: './hider.component.scss'
})
export class HiderComponent implements OnInit{
  avatar: string = '';
  userName: string | null = '';

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userName = this.authService.getCurrentUserName();
    this.avatar = "../../../../assets/images/Avatar.png";
  }

  goToCreateProj(): void  {
    this.router.navigate(['/menu/project/details']);
  }
}
