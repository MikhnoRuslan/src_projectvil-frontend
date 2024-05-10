import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from "@angular/common";
import { PaginationChangesServiceService } from "../../../core/services/pagination-changes.service.service";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgFor,
    NgIf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit  {
  @Input() pageCount!: number;
  @Input() take: number = 0;

  pages: {page: number, isShow: boolean}[] = [];
  currentPage: number = 1;

  sizeShowingPage = 5;

  constructor(
    private paginationChangesService: PaginationChangesServiceService
  ) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.pageCount; i++) {
      if (i >= this.sizeShowingPage) {
        this.pages.push({ page: i + 1, isShow: false });
      } else {
        this.pages.push({ page: i + 1, isShow: true });
      }
    }
  }

  choosePage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.changePagination();
  }

  nextPage(): void {
    if (this.currentPage != this.pages.length) {
      this.currentPage = this.currentPage + 1;

      if (this.currentPage > this.sizeShowingPage) {
        this.pages[this.currentPage - 1].isShow = true;
        this.pages[this.currentPage - 1 - this.sizeShowingPage].isShow = false;
      }
    }

    this.changePagination();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;

      const index = this.pages.findIndex(page => page.isShow);

      if (index === this.currentPage) {
        this.pages[this.currentPage - 1].isShow = true;
        this.pages[this.currentPage + this.sizeShowingPage - 1].isShow = false
      }
    }

    this.changePagination();
  }

  changePagination() {
    this.paginationChangesService.paginationChanged$.next((this.currentPage - 1) * this.take);
  }
}
