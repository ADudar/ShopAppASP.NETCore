import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IPagination} from '../models/pagination';
import {Observable} from 'rxjs';
import {IBrand} from "../models/brand";
import {IType} from "../models/product-type";
import {map} from "rxjs/operators";
import {ShopParams} from "../models/shopParams";
import {IProduct} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) {
  }

  getProducts(shopParams: ShopParams): Observable<IPagination> {
    let params = new HttpParams();
    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString());
    }
    if (shopParams.search) {
      params = params.append('search', shopParams.search);
    }
    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());


    return this.http.get<IPagination>(`${this.baseUrl}products`, {observe: 'response', params})
      .pipe(
        map(response => response.body)
      );
  }

  getProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`);
  }

  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }

}
