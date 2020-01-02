import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  items: number[];
  itemsPerPage: number = 50;
  maxSize: number = 5;
  maxSizeItemsPagination = [5,10]
  maxSizeItems = [10,20,30,40,50]

  chageSizeItemsPagination(event) {
    this.maxSize = Number(event)
  }

  chageSizeItems(event: any) {
    this.itemsPerPage = Number(event);
  }

  getPage(event: number) {
    this.items = Array.from({ length: 1000 }, (_, index) => index).slice((event - 1) * this.itemsPerPage, event * this.itemsPerPage);
  }

  ngOnInit(): void {
    this.items = Array.from({ length: 1000 }, (_, index) => index).slice(0, 50)
  }

}
