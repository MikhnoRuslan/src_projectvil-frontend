import {Component, OnInit} from '@angular/core';
import {NavigationComponent} from "../../../shared/components/navigation/navigation.component";
import {NavigationButtonModel} from "../../../../shared/models/navigation-button.model";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-project-participant',
  standalone: true,
  imports: [
    NavigationComponent
  ],
  templateUrl: './project-participant.component.html',
  styleUrl: './project-participant.component.scss'
})
export class ProjectParticipantComponent implements OnInit{
  navigationButtons: NavigationButtonModel[] = [];

  ownerProject: string = '';
  participantProject: string = '';

  constructor(private translationService: TranslateService) {
  }

  ngOnInit(): void {
    this.translationService.get(['Navigation:OwnerOfProject', 'Navigation:ParticipantOfProject'])
      .subscribe((translations: any) => {
        this.ownerProject = translations['Navigation:OwnerOfProject'];
        this.participantProject = translations['Navigation:ParticipantOfProject'];

        this.navigationButtons = [
          { name: this.ownerProject, url: '/menu/project/isOwner/true', isSelected: false },
          { name: this.participantProject, url: '/menu/project/isOwner/false', isSelected: true }
        ];
      });
  }
}
