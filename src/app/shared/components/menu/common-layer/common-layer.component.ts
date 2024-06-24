import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HiderComponent } from "../hider/hider.component";
import { RouterOutlet } from "@angular/router";
import { Subscription } from "rxjs";
import { HiderService } from "../../../../core/services/hider.service";

@Component({
  selector: 'app-common-layer',
  standalone: true,
  imports: [
    HiderComponent,
    RouterOutlet
  ],
  templateUrl: './common-layer.component.html',
  styleUrl: './common-layer.component.scss'
})
export class CommonLayerComponent implements OnInit, OnDestroy {
  @Input() isHome: boolean = false;
  hiderSubscription$!: Subscription;
  isHomePage: boolean = false;

  constructor(
    private hiderService: HiderService
  ) {
  }

  ngOnInit(): void {
    this.isHomePage = this.isHome
    this.subscribeToHiderValueChanges();
  }

  ngOnDestroy(): void {
    this.hiderSubscription$.unsubscribe();
  }

  subscribeToHiderValueChanges(): void {
    this.hiderSubscription$ = this.hiderService.hiderChanged$.subscribe(res => {
      this.isHome = res
    })
  }
}
