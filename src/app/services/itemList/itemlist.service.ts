import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { IItems } from 'src/app/models/IItems.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemlistService {


  constructor(private http:HttpClient) {
    this.addtoFavourites$ = this.addtoFavourites.asObservable();
   }

  items$:Observable<IItems[]> = this.http.get(environment.apiUrl).pipe(map((item:any)=>{
    let itemData:IItems[]=[];
    for(let i of item.items){
      let id = item.items.indexOf(i) + 1

      itemData.push({...i,favourite:false,id:id})
    }
    return itemData
  }),
  catchError(err => {
    console.log('caught mapping error and rethrowing', err);
    return throwError(err);
}),)


  getSearches(seachText:string):Observable<IItems[]>{
    return this.http.get<IItems[]>(environment.apiUrl+'?q='+seachText)
  }

  addtoFavourites$: Observable<any>;
  private addtoFavourites: Subject<any> = new Subject();

  public addingToFav(direction:number[]) {
    this.addtoFavourites.next(direction);
 }
}
