import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationComponent } from "../../../shared/components/navigation/navigation.component";
import { NavigationButtonModel } from "../../../../shared/models/navigation-button.model";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { Subject, Subscription, switchMap, takeUntil } from "rxjs";
import { LanguageChangeService } from "../../../core/services/language-changes.service";
import { AuthService } from "../../../core/services/auth.service";
import { ProjectService } from "../../../core/services/project.service";
import {
  IPagedAndSortiedAndFilteredRequestInput
} from "../../../../shared/models/base/pagedAndSortiedAndFilteredRequest.mode";
import { IProjectDto, IProjectLikeDto } from "../../../../shared/models/project.model";
import { AsyncPipe, NgFor, NgIf, NgStyle, NgTemplateOutlet } from "@angular/common";
import { LikeComponent } from "../../../shared/components/like/like.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationChangesServiceService } from "../../../core/services/pagination-changes.service.service";
import { ROUTES } from "../../../shared/constants/routes";
import { SearchComponent } from "../../../shared/components/search/search.component";
import { SearchService } from "../../../core/services/search.service";
import { MessageService } from "../../../core/services/message.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    NavigationComponent,
    NgFor,
    AsyncPipe,
    LikeComponent,
    PaginationComponent,
    NgIf,
    TranslateModule,
    SearchComponent,
    NgStyle,
    NgTemplateOutlet
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit, OnDestroy {
  @Input() isCommon: boolean = false;
  navigationButtons: NavigationButtonModel[] = [];

  key: string = '';
  pageCount: number = 0;
  maxResultCount: number = 5;
  ownerProject: string = '';
  participantProject: string = '';
  private currentUserId: string | null = '';
  private readonly gateway: string = '';
  private entity = 'projectblob';
  private defaultProjectAvatar = './assets/images/project-avatar.svg'

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
  searchSubscription$!: Subscription;

  @ViewChild(LikeComponent, {static: false}) likeComponent!: LikeComponent

  constructor(
    private translationService: TranslateService,
    private languageChangeService: LanguageChangeService,
    private authService: AuthService,
    private projectService: ProjectService,
    private route: Router,
    private paginationChangesService: PaginationChangesServiceService,
    private searchService: SearchService,
    private messageService: MessageService
  ) {
    this.gateway = environment.issuer;
  }

  ngOnInit(): void {
    this.translationService.get(['Navigation:OwnerOfProject', 'Navigation:ParticipantOfProject'])
      .subscribe((translations: any) => {
        this.ownerProject = translations['Navigation:OwnerOfProject'];
        this.participantProject = translations['Navigation:ParticipantOfProject'];

        this.navigationButtons = [
          { name: this.ownerProject, url: '/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.isOwner + '/true', isSelected: true },
          { name: this.participantProject, url: '/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.isOwner + '/false', isSelected: false }
        ];
      });

    this.subscribeLanguageChanges();
    this.load();
    this.subscribePaginationChanges();
    this.subscribeToSearchValueChanges();
  }

  ngOnDestroy(): void {
    this.languageSubscription$.unsubscribe();
    this.paginationSubscription$.unsubscribe();
    this.searchSubscription$.unsubscribe()
  }

  subscribeLanguageChanges(): void {
    this.languageSubscription$ = this.languageChangeService.languageChanged$.subscribe(() => {
      this.translationService.get(['Navigation:OwnerOfProject', 'Navigation:ParticipantOfProject'])
        .subscribe((translations: any) => {
          this.ownerProject = translations['Navigation:OwnerOfProject'];
          this.participantProject = translations['Navigation:ParticipantOfProject'];

          this.navigationButtons = [
            { name: this.ownerProject, url: '/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.isOwner + '/true', isSelected: true },
            { name: this.participantProject, url: '/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.isOwner + '/false', isSelected: false }
          ];
        });

      this.load();
    })
  }

  subscribeToSearchValueChanges(): void {
    this.searchSubscription$ = this.searchService.searchChanged$.subscribe(res => {
      if (res && res.length >= 3) {
        this.input.filter = `Name~con~${res}`
      } else {
        this.input.filter = '';
      }

      this.input.skip = 0;

      this.load();
    })
  }

  subscribePaginationChanges(): void {
    this.paginationSubscription$ = this.paginationChangesService.paginationChanged$.pipe(
      takeUntil(this._destroy$),
      switchMap((res: number) => {
        this.input.skip = res;
        console.log('work');
        return this.projectService.getList(this.input);
      })
    ).subscribe(result => {
      this.data = result.items.map(x => ({
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
          ? `${this.gateway}/${this.entity}/get?id=${x.imageId}`
          : this.defaultProjectAvatar,
        like: x.like === null ? { projectId: x.id, likes: 0, isLike: false } : x.like,
        positions: x.positions,
        documentsIds: x.documentsIds
      }));
    });
  }

  goToDetails(id: string): void {
    this.route.navigate(['/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.details + '/' + id])
  }

  like(event: any, productLike: IProjectLikeDto): void {
    event.stopPropagation();

    productLike.isLike = !productLike.isLike;
    this.likeComponent.isLike = productLike.isLike;
    this.likeComponent?.likeChanged$.next(productLike.projectId);
  }

  load(): void {
    this.currentUserId = this.authService.getCurrentUserId();

    if (this.currentUserId != null && !this.isCommon) {
      if (this.input.filter) {
        this.input.filter = this.input.filter + `~and~UserId~eq~${this.currentUserId}`;
      } else {
        this.input.filter = `UserId~eq~${this.currentUserId}`;
      }
    }

    this.input.sort = 'CreateOn desc'
    this.getData();
  }

  goToCreateProj(): void  {
    if (this.authService.getIsAuthenticated()) {
      this.route.navigate(['/' + ROUTES.personArea + '/' + ROUTES.project + '/' + ROUTES.create]);
    } else {
      this.route.navigate([ROUTES.login]).then(() => {
        this.messageService.info(this.translationService.instant('Info:CreateProject'))
      });
    }
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
          ? `${this.gateway}/${this.entity}/get?id=${x.imageId}`
          : this.defaultProjectAvatar,
        like: x.like === null ? { projectId: x.id, likes: 0, isLike: false } : x.like,
        positions: x.positions,
        documentsIds: x.documentsIds
      }));

      this.searchService.countChanged$.next(this.pageCount);
    })
  }
}
