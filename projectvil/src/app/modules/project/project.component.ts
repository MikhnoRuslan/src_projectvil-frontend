import { Component, OnInit, ViewChild} from '@angular/core';
import { NavigationComponent } from "../../shared/components/navigation/navigation.component";
import { NavigationButtonModel } from "../../../shared/models/navigation-button.model";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, switchMap, takeUntil } from "rxjs";
import { LanguageChangeService } from "../../core/services/language-changes.service";
import { AuthService } from "../../core/services/auth.service";
import { ProjectService } from "../../core/services/project.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { IProjectDto, IProjectLikeDto } from "../../../shared/models/project.model";
import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { AppConfig } from "../../../config/config";
import { Project_Service } from "../../shared/constants/service.url.constants";
import { LikeComponent } from "../../shared/components/like/like.component";
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { PaginationChangesServiceService } from "../../core/services/pagination-changes.service.service";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NavigationComponent,
    NgFor,
    AsyncPipe,
    LikeComponent,
    PaginationComponent,
    NgIf
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  navigationButtons: NavigationButtonModel[] = [];

  pageCount: number = 0;
  maxResultCount: number = 5;
  ownerProject: string = '';
  participantProject: string = '';
  private currentUserId: string | null = '';
  private gateway = AppConfig.url;
  service = Project_Service;
  private entity = 'petprojectblob';
  private defaultProjectAvatar = './assets/images/project-avatar.avif'

  private _destroy$ = new Subject<void>();
  private input: IPagedAndSortiedAndFilteredRequestInput = {
    filter: undefined,
    sort: undefined,
    skip: 0,
    maxResultCount: this.maxResultCount
  };

  data: IProjectDto[] = [];

  languageSubscription$!: Subscription;
  paginationSubscription$!: Subscription;

  @ViewChild(LikeComponent, {static: false}) likeComponent!: LikeComponent

  constructor(
    private translationService: TranslateService,
    private languageChangeService: LanguageChangeService,
    private authService: AuthService,
    private projectService: ProjectService,
    private route: Router,
    private paginationChangesService: PaginationChangesServiceService) {
  }

  ngOnInit(): void {
    this.translationService.get(['Navigation:OwnerOfProject', 'Navigation:ParticipantOfProject'])
      .subscribe((translations: any) => {
        this.ownerProject = translations['Navigation:OwnerOfProject'];
        this.participantProject = translations['Navigation:ParticipantOfProject'];

        this.navigationButtons = [
          { name: this.ownerProject, url: '/menu/project/isOwner/true', isSelected: true },
          { name: this.participantProject, url: '/menu/project/isOwner/false', isSelected: false }
        ];
      });

    this.subscribeLanguageChanges();
    this.load();
    this.subscribePaginationChanges();
  }

  subscribeLanguageChanges(): void {
    this.languageSubscription$ = this.languageChangeService.languageChanged$.subscribe(() => {
      this.translationService.get(['Navigation:OwnerOfProject', 'Navigation:ParticipantOfProject'])
        .subscribe((translations: any) => {
          this.ownerProject = translations['Navigation:OwnerOfProject'];
          this.participantProject = translations['Navigation:ParticipantOfProject'];

          this.navigationButtons = [
            { name: this.ownerProject, url: '/menu/project/isOwner/true', isSelected: true },
            { name: this.participantProject, url: '/menu/project/isOwner/false', isSelected: false }
          ];
        });

      this.load();
    })
  }

  subscribePaginationChanges(): void {
    this.paginationSubscription$ = this.paginationChangesService.paginationChanged$.pipe(
      takeUntil(this._destroy$),
      switchMap((res: number) => {
        this.input.skip = res;
        return this.projectService.getList(this.input);
      })
    ).subscribe(result => {
      this.data = result.items.map(x =>({
        id: x.id,
        name: x.name,
        description: x.description,
        domainId: x.domainId,
        domainName: x.domainName,
        statusId: x.statusId,
        statusName: x.statusName,
        projectUrl: x.projectUrl,
        gitUrl: x.gitUrl,
        imageId: x.imageId,
        imageUrl: x.imageId
          ? `${this.gateway}/${this.service}/${this.entity}/get?id=${x.imageId}`
          : this.defaultProjectAvatar,
        like: x.like === null ? { projectId: x.id, likes: 0, isLike: false } : x.like
      }));
    });
  }

  goToDetails(id: string): void {
    this.route.navigate(['/login'])
  }

  like(event: any, productLike: IProjectLikeDto): void {
    event.stopPropagation();

    productLike.isLike = !productLike.isLike;
    this.likeComponent.isLike = productLike.isLike;
    this.likeComponent?.likeChanged$.next(productLike.projectId);
  }

  load(): void {
    this.currentUserId = this.authService.getCurrentUserId();
    this.input.filter = `UserId~eq~${this.currentUserId}`;
    this.input.sort = 'CreateOn desc'
    this.getData();
  }

  private getData(): void {
    this.projectService.getList(this.input).subscribe(result => {
      this.pageCount = Math.ceil(result.totalCount / this.maxResultCount);
      this.data = result.items.map(x =>({
        id: x.id,
        name: x.name,
        description: x.description,
        domainId: x.domainId,
        domainName: x.domainName,
        statusId: x.statusId,
        statusName: x.statusName,
        projectUrl: x.projectUrl,
        gitUrl: x.gitUrl,
        imageId: x.imageId,
        imageUrl: x.imageId
          ? `${this.gateway}/${this.service}/${this.entity}/get?id=${x.imageId}`
          : this.defaultProjectAvatar,
        like: x.like === null ? { projectId: x.id, likes: 0, isLike: false } : x.like
      }));
    })
  }
}
