import {Component} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {SearchService} from "../../../core/services/search.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    TranslateModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(
    private searchService: SearchService
  ) {
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.value.length < 1) {
      this.searchService.searchChanged$.next(input.value);
      console.log(input.value);
    }

    if (input.value.length >= 3) {
      this.searchService.searchChanged$.next(input.value);
    }
  }
}
