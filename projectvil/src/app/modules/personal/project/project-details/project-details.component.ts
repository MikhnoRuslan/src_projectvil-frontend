import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { JsonPipe, NgClass, NgFor, NgForOf, NgIf, NgStyle } from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { NavigationComponent } from "../../../../shared/components/navigation/navigation.component";
import {TranslateModule, TranslateService,} from "@ngx-translate/core";
import {
  ReactiveFormsModule,
  FormsModule, FormGroup, FormControl, Validators,
} from "@angular/forms";
import { DropdownComponent } from "../../../../shared/components/dropdown/dropdown.component";
import { ProjectService } from "../../../../core/services/project.service";
import { Subscription } from "rxjs";
import {ICreateProjectCommentInput, IProjectDto } from "../../../../../shared/models/project.model";
import { environment } from "../../../../../environments/environment";
import { SliderComponent } from "../../../../shared/components/slider/slider.component";
import { E_POSITION_LEVEL } from "../../../../../shared/models/position.model";
import { ProjectCommentService } from "../../../../core/services/project-comment.service";
import { ROUTES } from "../../../../shared/constants/routes";
import { AuthService } from "../../../../core/services/auth.service";
import { MessageService } from "../../../../core/services/message.service";

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
    DropdownComponent,
    NgIf,
    JsonPipe,
    SliderComponent,
    NgForOf,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  private route$!: Subscription;
  private projectId: string = '';
  data?: IProjectDto;
  images: string[] = [];
  icon: string = '../../../../assets/images/icon-user.svg';
  private entity = 'projectblob';
  private readonly gateway: string = '';

  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  private isDown = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private commentService: ProjectCommentService,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private translationService: TranslateService
  ) {
    this.gateway = environment.issuer
  }

  formComment = new FormGroup({
    comment: new FormControl('', required)
  })

  ngOnInit(): void {
    this.route$ = this.route.params.subscribe(params => {
      if (params['id']) {
        this.projectId = params['id'];

        if (this.authService.getIsAuthenticated()) {
          this.projectService.get(this.projectId).subscribe(res => {
            this.data = res;

            res.documentsIds.forEach((value: string, index: number) => {
              this.images.push(`${this.gateway}/${this.entity}/get?id=${value}`);
            })
          })
        } else {
          this.router.navigate([ROUTES.login]).then(() => {
            this.messageService.info(this.translationService.instant('Info:CreateProject'))
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.route$?.unsubscribe();
  }

  getLevelString(level: E_POSITION_LEVEL): string {
    return E_POSITION_LEVEL[level];
  }

  onMouseDown(event: MouseEvent) {
    this.isDown = true;
    this.startX = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    this.scrollLeft = this.scrollContainer.nativeElement.scrollLeft;

    this.renderer.addClass(document.body, 'no-select');
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDown = false;

    this.renderer.removeClass(document.body, 'no-select');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const x = event.pageX - this.scrollContainer.nativeElement.offsetLeft;
    const walk = (x - this.startX);
    this.scrollContainer.nativeElement.scrollLeft = this.scrollLeft - walk;
  }

  onWheel(event: WheelEvent) {
    const container = this.scrollContainer.nativeElement;
    const atStart = container.scrollLeft === 0;
    const atEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth;

    if ((!atStart && event.deltaY < 0) || (!atEnd && event.deltaY > 0)) {
      event.preventDefault();
      container.scrollLeft += event.deltaY;
    }
  }

  respond(): void {
    console.log("work")
  }

  onSubmit(): void {
    if (this.formComment.valid) {
      const {
        comment
      } = this.formComment.getRawValue()

      const input = {
        comment,
        projectId: this.projectId
      } as ICreateProjectCommentInput

      this.commentService.create(input). subscribe(() => {});

      this.formComment.reset();

      /*const currentUrl = this.router.url;
      const parentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

      this.router.navigateByUrl(parentUrl, { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
      });*/
    }
  }
}
