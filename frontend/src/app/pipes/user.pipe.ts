import { Pipe, PipeTransform } from '@angular/core';
import { PipeData } from '../models/pipeData';
import { PipeDataRow } from '../models/pipeDataRow';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(value: string, arg: PipeData): unknown {
    let data: PipeDataRow[] = arg.pipeData;
    let name: string = "No encontrado";
    data.forEach(row => {
      if(row._id == value) {
        name = row.name;
        return;
      }
    });
    return name;
  }

}
