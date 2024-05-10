import {Component, Input} from "@angular/core";
import {NavigationButtonModel} from "../../../../shared/models/navigation-button.model";
import {NgFor} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgFor, RouterLink, TranslateModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  @Input() navigationButtons: NavigationButtonModel[] = [];

  constructor(private router: Router) {
  }

  goTo(path: string): void {
    console.log(path)
    this.router.navigate([path]);
  }
}
