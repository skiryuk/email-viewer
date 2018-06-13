
export class Email {
  from: string;
  to: Array<string>;
  cc: Array<string>;
  bcc: Array<string>;
  subject: string;
  body: string;
  date: Date;
}
