import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgIf } from "@angular/common";
import { Observable, Subject, Subscription } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IProjectLikeDto } from "../../../../shared/models/project.model";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss'
})
export class LikeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() total: number = 0;
  @Input() isLike: boolean = false;

  @Input() isTotal: boolean = false;
  @Input() entityName: string = '';

  private readonly gateway: string = '';
  likeChanged$: Subject<string> = new Subject<string>();
  likeSubscription$!: Subscription;
  image: string = '../../../../assets/images/heart.svg'

  constructor(
    private http: HttpClient
  ) {
    this.gateway = environment.issuer;
  }

  ngOnInit(): void {
    this.image = this.isLike
      ? '../../../../assets/images/heart-fill.png'
      : '../../../../assets/images/heart.svg';

    this.subscribeToLikeChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLike'].currentValue && changes['isLike'].previousValue !== undefined) {
      this.isLike = true;
      this.image = '../../../../assets/images/heart-fill.png'
      if (this.isTotal) {
        this.total += 1;
      }
    } else if (!changes['isLike'].currentValue) {
      this.isLike = false;
      this.image = '../../../../assets/images/heart.svg'
      if (this.isTotal && this.total > 0) {
        this.total -= 1;
      }
    }
  }

  ngOnDestroy(): void {
    this.likeSubscription$.unsubscribe();
  }

  subscribeToLikeChanges(): void {
    this.likeSubscription$ = this.likeChanged$.subscribe((projectId: string) => {
      this.like(projectId).subscribe();
    })
  }

  like(projectId: string): Observable<IProjectLikeDto> {
    const url = `${this.gateway}/${this.entityName}`

    const body = JSON.stringify(projectId);
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post<IProjectLikeDto>(url, body, {headers});
  }
}
