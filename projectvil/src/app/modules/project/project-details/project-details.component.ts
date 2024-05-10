import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass, NgFor, NgStyle } from "@angular/common";
import { NavigationButtonModel } from "../../../../shared/models/navigation-button.model";
import { Router, RouterLink } from "@angular/router";
import { NavigationComponent } from "../../../shared/components/navigation/navigation.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DropdownComponent } from "../../../shared/components/dropdown/dropdown.component";
import { Subscription } from "rxjs";
import { LanguageChangeService } from "../../../core/services/language-changes.service";
import { ProjectBlobService } from "../../../core/services/blobs/project-blob.service";
import { ProjectService } from "../../../core/services/project.service";
import { MessageService } from "../../../core/services/message.service";
import { ICreateProjectInput } from "../../../../shared/models/project.model";
import { AuthService } from "../../../core/services/auth.service";
import { AppConfig } from "../../../../config/config";
import { Project_Service } from "../../../shared/constants/service.url.constants";

const { required, maxLength } = Validators;

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    NavigationComponent,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    NgStyle,
    NgClass,
    DropdownComponent
  ],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  navigationButtons: NavigationButtonModel[] = [];
  createProject: string = '';
  listOfProject: string = '';
  nameLength: number = 50;
  descriptionLength: number = 700;
  positionLength: number = 50;
  domainService: string = 'api/project-service';
  domainEntity: string = 'domain/domains';
  statusService: string = 'api/project-service';
  statusEntity: string = 'status/statuses';

  private gateway = AppConfig.url;
  private service = Project_Service;
  private entity = 'petprojectblob';

  selectedValue: string = '';
  imageUrl: string | ArrayBuffer = "./assets/images/avatar.svg";

  documents: { id: string; url: string }[] = [];

  languageSubscription$!: Subscription;

  constructor(
    private translationService: TranslateService,
    private languageChangeService: LanguageChangeService,
    private projectBlobService: ProjectBlobService,
    private projectService: ProjectService,
    private route: Router,
    private messageService: MessageService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.translationService.get(['Navigation:CreateProject', 'Navigation:ListOfProject'])
      .subscribe((translations: any) => {
        this.createProject = translations['Navigation:CreateProject'];
        this.listOfProject = translations['Navigation:ListOfProject'];

        this.navigationButtons = [
          { name: this.listOfProject, url: '/menu/project/isOwner/true', isSelected: false },
          { name: this.createProject, url: '/menu/project/details', isSelected: true }
        ];
      });

    this.subscribeLanguageChanges();
  }

  subscribeLanguageChanges(): void {
    this.languageSubscription$ = this.languageChangeService.languageChanged$.subscribe(() => {
      this.translationService.get(['Navigation:CreateProject', 'Navigation:ListOfProject'])
        .subscribe((translations: any) => {
          this.createProject = translations['Navigation:CreateProject'];
          this.listOfProject = translations['Navigation:ListOfProject'];

          this.navigationButtons = [
            { name: this.listOfProject, url: '/menu/project/isOwner/true', isSelected: false },
            { name: this.createProject, url: '/menu/project/details', isSelected: true }
          ];
        });
    })
  }

  ngOnDestroy(): void {
    this.languageSubscription$.unsubscribe();
  }

  projectForm = new FormGroup({
    name: new FormControl("", [required, maxLength(this.nameLength)]),
    description: new FormControl("", [required, maxLength(this.descriptionLength)]),
    domain: new FormControl("", [required]),
    positions: new FormControl(null, [required, maxLength(this.positionLength)]),
    status: new FormControl("", [required]),
    projectLink: new FormControl(null),
    gitLink: new FormControl(null),
    image: new FormControl(null),
    documents: new FormControl(null)
  })

  onSubmit(): void {
    const documentIds: string[] = this.documents.map(x => x.id);

    const cont = this.projectForm.get('documents') as FormControl;
    cont.setValue(documentIds);

    if (this.projectForm.valid) {
      const {
        name,
        description,
        domain,
        status,
        projectLink,
        gitLink,
        image,
        documents
      } = this.projectForm.getRawValue();

      const createProjectInput = {
        userId: this.authService.getCurrentUserId(),
        name,
        description,
        domainId: domain,
        statusId: status,
        projectUrl: projectLink,
        gitUrl: gitLink,
        imageId: image,
        documentsIds: documentIds
      } as ICreateProjectInput;

      this.projectService.create(createProjectInput).subscribe(res => {
        if (res) {
          this.route.navigate(['/menu/project/isOwner/true'])
            .then(() => this.messageService.success(this.translationService.instant('Success:CreateProject')))
        }
      })
    } else {
      Object.keys(this.projectForm.controls).forEach(field => {
        const control = this.projectForm.get(field) as FormControl;
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  getCount(controlName: string): number {
    const value = this.projectForm.get(controlName)?.value;
    if (value) {
      return value.toString().length;
    } else return 0;
  }

  onValueChange(value: any, controlName: string) {
    const control = this.projectForm.get(controlName) as FormControl;
    control.setValue(value);
  }

  loadFile(event: any): void {
    let selectedFile = event.target.files[0];

    this.projectBlobService.create(selectedFile)
      .subscribe(result => {
        if (result) {
          const control = this.projectForm.get('image') as FormControl;
          control.setValue(result)

          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.imageUrl = e.target.result;
          };
          reader.readAsDataURL(selectedFile);
        } else {
          this.imageUrl = "./assets/images/avatar.svg";
        }
      })
  }

  loadDocument(event: any): void {
    let selectedFile = event.target.files[0];

    this.projectBlobService.create(selectedFile)
      .subscribe(result => {
        if (result) {
          const control = this.projectForm.get('documents') as FormControl;
          control.patchValue(result)

          this.documents.push({id: result, url: `${this.gateway}/${this.service}/${this.entity}/get?id=${result}`});
        }
      })
  }
}
