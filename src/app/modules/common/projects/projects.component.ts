import { Component } from '@angular/core';
import {ProjectComponent} from "../../personal/project/project.component";

@Component({
  selector: 'app-common-project',
  standalone: true,
  imports: [
    ProjectComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class CommonProjectComponent {

}
