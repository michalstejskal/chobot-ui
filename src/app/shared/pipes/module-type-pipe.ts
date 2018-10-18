import {Pipe, PipeTransform} from '@angular/core';

// 0 lambda
// 1 git repository
// 2 docker image
@Pipe({name: 'moduleTypePipe'})
export class ModuleTypePipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0) {
      return 'lambda';
    }else if (value === 1) {
      return 'git repository';
    }else if (value === 2) {
      return 'docker image';
    }
    return 'unknown';
  }
}
