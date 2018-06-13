import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Email} from '../../models/email';
import {DataService} from '../../services/data.service';
import {PageChanged} from '../../models/page-changed';
import {PagerComponent} from '../pager/pager.component';
import {FilterChanged} from '../../models/filter-changed';
import {SearchFilterComponent} from '../search-filter/search-filter.component';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.css']
})
export class EmailListComponent implements OnInit {

  @ViewChild('pager') pager: PagerComponent;
  @ViewChild('searchFilter') searchFilter: SearchFilterComponent;
  @Output() selectEmail: EventEmitter<Email> = new EventEmitter<Email>();

  emails: Email[] = [];
  filteredEmails: Email[] = [];
  currentEmails: Email[] = [];

  pageChangedState: PageChanged;
  filterChangedState: FilterChanged;
  searchedValue: string;
  selectedEmail: Email;
  isPageChanged = false;
  startDate: Date = new Date();
  endDate: Date = new Date();

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getEmailData().subscribe(
      (emails: Email[]) => {
        this.emails = emails;
        this.startDate = this.emails[this.emails.length - 1].date;
        this.endDate = this.emails[0].date;
        this.filteredEmails = emails;
        this.updateFilterAndPagerState();
      },

      (err: HttpErrorResponse) => {
        console.error (err.message);
      }
    );
  }

  onPageChanged(pageChanged: PageChanged) {
    this.pageChangedState = pageChanged;
    this.currentEmails = this.filteredEmails.slice(this.pageChangedState.offset, this.pageChangedState.limit);
    this.isPageChanged = true;
  }

  onFilterChanged(filterChanged: FilterChanged) {
    this.filterChangedState = filterChanged;
    this.onFilterList();
  }

  onSearchValueChanged(searchedValue: string) {
    this.searchedValue = searchedValue;
    this.onFilterList();
  }

  onFilterList() {
    if (this.emails.length > 0) {
      this.filteredEmails = this.emails.filter((email: Email) => {

        const filter1 = (this.filterChangedState && this.filterChangedState.startDate && this.filterChangedState.endDate) ?
                          email.date >= this.filterChangedState.startDate && email.date <= this.filterChangedState.endDate : true;
        const filter2 = this.filterChangedState && this.filterChangedState.fromWhom ? this.filterChangedState.fromWhom === email.from : true;
        const filter3 = this.filterChangedState && this.filterChangedState.toWhom ? email.to.indexOf(this.filterChangedState.toWhom) >= 0 || email.cc.indexOf(this.filterChangedState.toWhom) >= 0 : true;
        const filter4 = this.searchedValue && this.searchedValue !== '' ? email.subject.toLowerCase().indexOf(this.searchedValue.toLowerCase()) >= 0 || email.body.toLowerCase().indexOf(this.searchedValue.toLowerCase()) >= 0 : true;

        return filter1 && filter2 && filter3 && filter4;
      });
      this.pager.currentPage = 1;
      this.updateFilterAndPagerState();
      this.selectEmail.emit(null);
      this.selectedEmail = null;
    }
  }

  updateFilterAndPagerState() {
    const fromwhoms = [];
    const towhoms = [];

    this.emails.forEach((email: Email) => {
      if (fromwhoms.indexOf(email.from) < 0) {
        fromwhoms.push(email.from);
      }
    });

    this.emails.forEach((email: Email) => {
      email.to.forEach((to: string) => {if (towhoms.indexOf(to) < 0) { towhoms.push(to); }});
      email.cc.forEach((cc: string) => {if (towhoms.indexOf(cc) < 0) { towhoms.push(cc); }});
    });

    fromwhoms.sort((a: string, b: string) => {
      return a.localeCompare(b);
    });
    towhoms.sort((a: string, b: string) => {
      return a.localeCompare(b);
    });
    this.searchFilter.fromwhoms = fromwhoms.map(whom => {
      return { name: whom, code: whom};
    });
    this.searchFilter.towhoms = towhoms.map(whom => {
      return { name: whom, code: whom};
    });
    this.pager.totalItems = this.filteredEmails.length;
    this.pager.onPageChanged();
  }

  getMessage(email: Email) {
    const pos = Utils.getMessagePosition(email.body);
    return (pos >= 0) ? email.body.substring(0, pos) : email.body;
  }

  onSelectEmail(email: Email) {
    this.selectedEmail = email;
    this.selectEmail.emit(email);
  }

  getToAddresses(email: Email) {
    const to = email.to.join(', ');
    return to ? to : 'не указан';
  }
}
