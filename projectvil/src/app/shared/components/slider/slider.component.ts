import { Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  @Input() images: string[] = [];
  constructor() { }
}
