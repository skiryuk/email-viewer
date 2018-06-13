
export class FilterChanged {
  constructor(public startDate: Date, public endDate: Date, public toWhom: string, public fromWhom: string) {}
}
