import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { IItems } from 'src/app/models/IItems.interface';
import { ItemlistService } from 'src/app/services/itemList/itemlist.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  id: number;
  sub: any;
  selectedItem:Observable<IItems>;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,private itemListService: ItemlistService) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.id = +params['id']; 
      this.selectedItem = this.itemListService.items$.pipe(
        map((items)=>{
          let selectedItem = items.filter(item => item.id === this.id);
          return selectedItem[0];
        })
      )
   });
  }

  back() {
    this.router.navigate(['/']);
  }

}
