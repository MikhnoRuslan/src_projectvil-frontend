import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, NgForOf, CommonModule ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})

export class DropdownComponent {
  @Input() title: string = '';
  @Input() data: any[] = [];
  @Input() textField: string = '';
  @Input() valueField: string = '';
  selectedValue: string = '';
}
