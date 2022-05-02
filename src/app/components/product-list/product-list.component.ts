import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, forkJoin, map, Observable, Subscription, switchMap } from 'rxjs';
import { combineLatest,pipe } from 'rxjs';
import { IItems } from 'src/app/models/IItems.interface';
import { ItemlistService } from 'src/app/services/itemList/itemlist.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private itemService:ItemlistService) { }

  items$ = this.itemService.items$;

  // search subject, strem
  searchItemSubject = new BehaviorSubject('');
  searchItemSction$ = this.searchItemSubject.asObservable();
  searchInput="";

  // sort subject, strem
  sortItemSubject = new BehaviorSubject('');
  sortItemAction$ = this.sortItemSubject.asObservable();
  sortValue = '';



  ngOnInit(): void {
    
  }

  // latest result 
  alldata$:Observable<any> = combineLatest([this.items$,this.searchItemSction$,this.sortItemAction$]).pipe(
    debounceTime(500),
    distinctUntilChanged(),
    map(([items,searchInput,sortItems])=>{
      // by search
      if(searchInput){
        return items.filter((item)=>{
          return item.title.indexOf(searchInput) > -1 || item.description.indexOf(this.searchInput) > -1 || item.email.indexOf(this.searchInput) > -1 || item.price.indexOf(this.searchInput) > -1
        })
      }
      // by sort 
      else if (sortItems){
        return items.sort((a, b) => {
          
          if(sortItems==='price'){
            return (parseInt(a['price']) - parseInt(b['price']));
          }
          else {
            let strA;
            let strB;
            switch (sortItems) {
              case 'email':
                strA = JSON.stringify(a['email']);
                strB = JSON.stringify(b['email']);
                  break;
              case 'description':
                strA = JSON.stringify(a['description']);
                strB = JSON.stringify(b['description']);
                  break;
              case 'price':
                strA = a['price'];
                strB = b['price'];
                  break;
              default:
                strA = JSON.stringify(a['title']);
                strB = JSON.stringify(b['title']);
                  break;
            }

            if (strA < strB) {
              return -1;
            }
            if (strA > strB) {
              return 1;
            }
            return 0;
          } 
        });
      }
      // default
      else {
        return items
      }
    })
  )
  
  //search 
  onSearch(e:Event){
    let searchInput =( e.target as HTMLInputElement).value

    this.searchItemSubject.next(searchInput)
  }
 
  //sort 
  onSort(e:Event) {
    let sortValue = (e.target as HTMLSelectElement).value
    this.sortItemSubject.next(sortValue)
  }

}
