import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs';
import {Email} from '../models/email';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  getEmailData(): Observable<Email[]> {
    return this.http.get('./assets/email.json')
      .map((data: any[]) => {
        data.forEach(x => {
          x.date = new Date(x.date.replace('+0000', ''));
        });
        data.sort((a, b) => {
          return b.date - a.date;
        });
        return data;
      });
  }
}
