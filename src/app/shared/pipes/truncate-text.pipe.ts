import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncateText' })
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, limit: number = 25): string {
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
