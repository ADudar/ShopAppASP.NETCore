import {Component, OnInit} from '@angular/core';
import {ShopService} from './shop.service';
import {IProduct} from '../models/product';
import {IBrand} from "../models/brand";
import {IType} from "../models/product-type";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public products: IProduct[];
  public brands: IBrand[];
  public types: IType[];

  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  getProducts() {
    this.shopService.getProducts()
      .subscribe(response => {
        this.products = response.data;
      }, (e) => console.error(e));
  }

  getBrands() {
    this.shopService.getBrands()
      .subscribe((response: IBrand[]) => {
        this.brands = response;
      }, e => {
        console.error(e);
      });
  }


  getTypes() {
    this.shopService.getTypes()
      .subscribe((response: IType[]) => {
        this.types = response;
      }, e => {
        console.error(e);
      });
  }


}
