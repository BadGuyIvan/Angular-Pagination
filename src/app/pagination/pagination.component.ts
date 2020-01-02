import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  itemsPerPage: number;
  
  @Input()
  totalItems: number;
  
  @Input()
  maxSize: number;
  
  @Output()
  public onChange = new EventEmitter();
  
  currentPage: number = 1;
  paginationItems: Number[]
  startPage: number = 0;
  endPage: number;
  lastPageText: number;

  prevPage() {
    if (this.currentPage === 1)
      return
    if (this.currentPage <= this.paginationItems[0])
      this.paginationItems = this.generationPaginationItems(this.startPage === 0 ? 0 : --this.startPage, this.maxSize === this.endPage ? this.maxSize : --this.endPage)
    this.currentPage -= 1
    this.onChange.emit(this.currentPage);
  }

  isLowLimit() {
    return this.paginationItems[0] > 1
  }

  isHighLimit() {
    return this.paginationItems[this.paginationItems.length - 1] < Math.ceil(this.totalItems / this.itemsPerPage)
  }

  nextPage() {
    if (this.currentPage === Math.ceil(this.totalItems / this.itemsPerPage))
      return

    if (this.currentPage >= this.paginationItems[this.paginationItems.length - 1])
      this.paginationItems = this.generationPaginationItems(++this.startPage, ++this.endPage)
    this.currentPage += 1
    this.onChange.emit(this.currentPage);
  }

  onCurrentPage(page) {
    this.currentPage = page;
    this.onChange.emit(page)
  }

  onFirstPage() {
    this.currentPage = 1;
    this.startPage = 0;
    this.endPage = this.maxSize;
    this.onChange.emit(1);
    this.paginationItems = this.generationPaginationItems(0, this.maxSize);
  }

  onLastPage() {
    this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
    this.startPage = this.currentPage - this.maxSize;
    this.endPage = this.currentPage;
    this.onChange.emit(this.currentPage);
    this.paginationItems = this.generationPaginationItems(this.currentPage - this.maxSize, this.currentPage);
  }

  generationPaginationItems(start: number, end: number) {
    return Array.from({ length: Math.ceil(this.totalItems / this.itemsPerPage) }, (_, index) => index + 1).slice(start, end)
  }

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    // if(changes.maxSize) {
    //   this.maxSize = changes.maxSize.currentValue;
    //   this.endPage = this.maxSize;
    //   this.paginationItems = this.generationPaginationItems(this.startPage, this.endPage)
    // }
    // if(changes.itemsPerPage) {
    //   this.itemsPerPage = changes.itemsPerPage.currentValue;
    //   this.lastPageText = Math.ceil(this.totalItems/changes.itemsPerPage.currentValue);
    //   this.paginationItems = this.generationPaginationItems(this.startPage, this.endPage);
    // }
  }

  ngOnInit() {
    this.endPage = this.maxSize;
    this.onChange.emit(this.currentPage);
    this.lastPageText = Math.ceil(this.totalItems/this.itemsPerPage);
    this.paginationItems = this.generationPaginationItems(this.startPage, this.endPage)
  }

}
