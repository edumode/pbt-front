import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'images'
})
export class ImagesPipe implements PipeTransform {

  transform(tools: any, img: any): any {
    
    if(img === undefined) return tools;

      return tools.filter(function(item){
        return item.file.toLowerCase().includes(img.toLowerCase()) 
      });
 
  }

}
