import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable, Subscription } from 'rxjs';
import { ItemlistService } from 'src/app/services/itemList/itemlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  //favoritesList
  private subscriptions: Subscription = new Subscription();
  favoritesList:number[]=[];

  //search
  searchItemSubject = new BehaviorSubject('');
  searchItemSction$ = this.searchItemSubject.asObservable();
  searchInput="";

  constructor(private itemListService : ItemlistService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.itemListService.addtoFavourites$.subscribe(favId => {
      let index = this.favoritesList.indexOf(favId);
      if (index !== -1) {
        this.favoritesList.splice(index, 1);
      }
      else{
        this.favoritesList.push(favId)
      }

    }));   
  }

  items$ = this.itemListService.items$;
  
  
  // modal 
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }

  //favourite list
  favListdata$:Observable<any> = combineLatest([this.items$,this.searchItemSction$]).pipe(
    distinctUntilChanged(),
    map(([items,searchInput])=>{
        return items.filter((item)=>{
          return item.title.toLocaleLowerCase().indexOf(searchInput.toLocaleLowerCase()) > -1 
        })
      }
    ))
  //search
  onSearch(e:Event){
    let searchInput =( e.target as HTMLInputElement).value;
    this.searchItemSubject.next(searchInput)
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
