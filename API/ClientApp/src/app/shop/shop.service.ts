import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IPagination} from '../models/pagination';
import {Observable} from 'rxjs';
import {IBrand} from "../models/brand";
import {IType} from "../models/product-type";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl =  'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(brandId?: number, typeId?: number, sort?: string): Observable<IPagination> {
    let params = new HttpParams();
    if (brandId) {
      params = params.append('brandId', brandId.toString());
    }
    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }
    if (sort) {
      params = params.append('sort', sort);
    }
    return this.http.get<IPagination>(`${this.baseUrl}products`, {observe: 'response', params})
      .pipe(
        map(response => response.body)
      );
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`);
  }
  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }

}
