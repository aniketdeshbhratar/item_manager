import { Component, Input, OnInit } from '@angular/core';
import { IItems } from 'src/app/models/IItems.interface';
import { ItemlistService } from 'src/app/services/itemList/itemlist.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() itemDetails:IItems;

  favorites:boolean= true;
  

  constructor(private itemListService: ItemlistService) { }

  ngOnInit(): void {
  }


  addToFavorites(e:any){
    this.favorites = !this.favorites;
    this.itemListService.addingToFav(e)
  }

}
