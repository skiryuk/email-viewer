import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ButtonModule, CalendarModule, DropdownModule} from 'primeng/primeng';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {HttpClientModule} from '@angular/common/http';
import {DataService} from './services/data.service';
import {EmailListComponent} from './components/email-list/email-list.component';
import { PagerComponent } from './components/pager/pager.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { EmailDetailComponent } from './components/email-detail/email-detail.component';

const appRoutes: Routes = [
  { path: '', component: MainPageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    EmailListComponent,
    PagerComponent,
    SearchFilterComponent,
    HighlightSearchPipe,
    EmailDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CalendarModule,
    DropdownModule,
    ButtonModule,
    FormsModule
  ],
  providers: [DataService, Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
