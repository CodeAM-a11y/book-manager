import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnFormat',
})
export class IsbnFormatPipe implements PipeTransform {
  transform(value: string): string {
    if(value.length!=13){
      return value;
    }
    let arr1:string= value.slice(0,3);
    let arr2:string=value.slice(3,4);
    let arr3:string=value.slice(4,8);
    let arr4:string=value.slice(8,12);
    let arr5:string=value.slice(12,13);
    const AusgabeArray:string[] =[arr1,arr2,arr3,arr4,arr5];
    return AusgabeArray.join("-").toString();
  }
}
