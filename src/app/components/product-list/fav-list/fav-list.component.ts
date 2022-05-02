import { Component, Input, OnInit } from '@angular/core';
import { IItems } from 'src/app/models/IItems.interface';
import { ItemlistService } from 'src/app/services/itemList/itemlist.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent implements OnInit {

  @Input() FavListDetails:IItems;
  favorites:boolean= true;
  constructor(private itemListService:ItemlistService) { }

  ngOnInit(): void {
  }

  addToFavorites(e:any){
    this.favorites = !this.favorites
    this.itemListService.addingToFav(e)
  }

}
