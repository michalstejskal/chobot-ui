import {Pipe, PipeTransform} from '@angular/core';

// 1 created
// 2 set train data
// 3 training finished
// 4 deployed
@Pipe({name: 'statusPipe'})
export class StatusPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 1) {
      return 'created';
    }else if (value === 2) {
      return 'train data set';
    }else if (value === 3) {
      return 'training finished';
    }else if (value === 4){
      return 'deployed';
    }
    return 'error';
  }
}
