import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!args || args === '') {
      return value;
    }
    const regExp = new RegExp(`(${args})`, 'gi');
    return value.replace(regExp, '<span class="highlighted">$1</span>');
  }
}
