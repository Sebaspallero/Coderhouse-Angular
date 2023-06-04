import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
    return capitalized;
  }

}
