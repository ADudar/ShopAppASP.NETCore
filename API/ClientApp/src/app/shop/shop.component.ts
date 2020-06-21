import { Component, OnInit } from '@angular/core';
import {ShopService} from './shop.service';
import {IProduct} from '../models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public products: IProduct[];

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.getProducts()
      .subscribe(response => {
        this.products = response.data;
      }, (e) => console.error(e));
  }

}
