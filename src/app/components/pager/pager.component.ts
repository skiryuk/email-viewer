import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PageChanged} from '../../models/page-changed';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent {

  @Input() currentPage = 1;
  @Input() itemsPerPage = 20;
  totalItems = 40;

  @Output() pageChanged: EventEmitter<PageChanged> = new EventEmitter<PageChanged>();

  constructor() { }

  onPrev() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.onPageChanged();
    }
  }

  onNext() {
    if (this.currentPage * this.itemsPerPage < this.totalItems) {
      this.currentPage++;
      this.onPageChanged();
    }
  }

  onPageChanged() {
    this.pageChanged.emit(
      new PageChanged((this.currentPage - 1) * this.itemsPerPage,
        Math.min(this.currentPage * this.itemsPerPage, this.totalItems)));
  }

  getStartPageNumber() {
    return (this.totalItems > 0) ? (this.currentPage - 1) * this.itemsPerPage + 1 : 0;
  }

  getEndPageNumber() {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }

  getDisabledStatePrev() {
    return this.currentPage === 1;
  }

  getDisabledStateNext() {
    return this.currentPage * this.itemsPerPage >= this.totalItems;
  }
}
