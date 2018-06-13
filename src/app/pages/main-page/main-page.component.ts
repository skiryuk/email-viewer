import { Component } from '@angular/core';
import {Email} from '../../models/email';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  detailEmail: Email;

  constructor() { }

  onSelectEmail(email: Email) {
    this.detailEmail = email;
  }
}
