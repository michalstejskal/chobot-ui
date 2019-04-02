import {Pipe, PipeTransform} from '@angular/core';

// 1 created
// 2 set train data
// 3 training finished
// 4 deployed
@Pipe({name: 'passwordPipe'})
export class PasswordPipe implements PipeTransform {

  transform(value: string): string {
    return 'keep trying';
  }
}
