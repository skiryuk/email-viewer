import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilterChanged} from '../../models/filter-changed';
import {Subject} from 'rxjs';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent implements OnInit {

  @Output() filterChanged: EventEmitter<FilterChanged> = new EventEmitter<FilterChanged>();
  @Output() searchValueChanged: EventEmitter<string> = new EventEmitter<string>();

  searchUpdated = new Subject<string>();

  @Input() startDate: Date = new Date();
  @Input() endDate: Date = new Date();

  ru: any;

  towhoms: Array<{ name: string, code: string }> = [];
  fromwhoms: Array<{ name: string, code: string }> = [];
  selectedToWhom: { name: string, code: string };
  selectedFromWhom: { name: string, code: string };
  searchedValue: string;

  isOpenedFilterPanel = false;
  isFiltered = false;

  constructor() {
    this.searchUpdated.asObservable()
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((searchValue) => {
        this.searchValueChanged.emit(searchValue);
      });
  }

  ngOnInit() {
    this.ru = {
      firstDayOfWeek: 0,
      monthNames: ['Январь', 'Февраль' , 'Март' , 'Апрель' , 'Май' , 'Июнь' , 'Июль' , 'Август' , 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек' ],
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Воск', 'Пон', 'Вт', 'Ср', 'Четв', 'Пят', 'Суб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      today: 'Сегодня',
      clear: 'Очистить'
    };
  }

  onOpenFilter() {
    this.isOpenedFilterPanel = !this.isOpenedFilterPanel;
  }

  isDisabledFilterButton() {
    return !(!this.startDate && !this.endDate || this.startDate <= this.endDate) ||
    !((this.startDate && this.endDate) || this.selectedToWhom || this.selectedFromWhom || (this.searchedValue && this.searchedValue !== ''));
  }

  onClearFilter() {
    this.onClearSearch();
    this.selectedToWhom = null;
    this.selectedFromWhom = null;
    this.startDate = null;
    this.endDate = null;
    this.onFilterClick();
    this.isFiltered = false;
    this.isOpenedFilterPanel = false;
  }

  onClearSearch() {
    this.searchedValue = null;
    this.onSearchValue(this.searchedValue);
  }

  onFilterClick() {
    this.filterChanged.emit(new FilterChanged(this.startDate, this.endDate, (this.selectedToWhom) ? this.selectedToWhom.code : null, (this.selectedFromWhom) ? this.selectedFromWhom.code : null));
    this.isFiltered = true;
    this.isOpenedFilterPanel = false;
  }

  onSearchValue(value: string) {
    this.searchUpdated.next(value);
  }
}
