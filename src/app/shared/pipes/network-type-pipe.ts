import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'networkTypePipe'})
export class NetworkTypePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('_', ' ');
  }
}
