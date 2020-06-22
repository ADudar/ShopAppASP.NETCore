import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPagination} from '../models/pagination';
import {Observable} from 'rxjs';
import {IBrand} from "../models/brand";
import {IType} from "../models/product-type";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl =  'https://localhost:5001/api/';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IPagination> {
    return this.http.get<IPagination>(`${this.baseUrl}products?pageSize=50`);
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.baseUrl}products/brands`);
  }
  getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(`${this.baseUrl}products/types`);
  }

}
