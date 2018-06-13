import {Component, Input} from '@angular/core';
import {Email} from '../../models/email';
import {Utils} from '../../utils/utils';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.css']
})
export class EmailDetailComponent {

  @Input() email: Email;

  isOpenedLinkEmails = false;

  constructor() { }

  getHTMLEmailBody() {
    const pos = Utils.getMessagePosition(this.email.body);
    return (pos >= 0) ?
      this.email.body.substring(0, pos).replace(/(?:\r\n|\r|\n)/g, '<br>') :
      this.email.body.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }

  isHasLinkEmails() {
    return Utils.getMessagePosition(this.email.body) >= 0;
  }

  onClickShowMoreButton() {
    this.isOpenedLinkEmails = !this.isOpenedLinkEmails;
  }

  getLinkEmails() {
    return Utils.splitOnLinkMessages(this.email.body);
  }

  getFormattedLinkEmail(linkEmail: string) {
    return linkEmail.replace(/(?:\r\n|\r|\n)/g, '<br>');
  }
}
