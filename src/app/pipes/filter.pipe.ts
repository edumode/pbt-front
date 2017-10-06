import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any, find: any): any {
   
    if(find === undefined) return data;

      return data.filter(function(item){
        return item.text.toLowerCase().includes(find.toLowerCase()) 
        || item.index.toLowerCase().includes(find.toLowerCase())
        || item.title.toLowerCase().includes(find.toLowerCase())
        || item.date.toLowerCase().includes(find.toLowerCase())
      });

 }

}
