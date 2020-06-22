import {Component, OnInit} from '@angular/core';
import {ShopService} from './shop.service';
import {IProduct} from '../models/product';
import {IBrand} from "../models/brand";
import {IType} from "../models/product-type";
import {ShopParams} from "../models/shopParams";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  public products: IProduct[];
  public brands: IBrand[];
  public types: IType[];
  shopParams = new ShopParams();
  totalCount: number;
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'},
  ];


  constructor(private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();

  }

  getProducts() {
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      }, (e) => console.error(e));
  }

  getBrands() {
    this.shopService.getBrands()
      .subscribe((response: IBrand[]) => {
        this.brands = [{id: 0, name: 'All'}, ...response];
      }, e => {
        console.error(e);
      });
  }


  getTypes() {
    this.shopService.getTypes()
      .subscribe((response: IType[]) => {
        this.types =  [{id: 0, name: 'All'}, ...response];
      }, e => {
        console.error(e);
      });
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId;
    this.getProducts();

  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event) {
    this.shopParams.pageNumber = event.page;
    this.getProducts();
  }


}
