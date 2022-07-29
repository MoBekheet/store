import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environment/environment";
import { ProductResponse } from "../model/product";

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  ApiUrl = 'https://fakestoreapi.com';

  constructor(
    private httpClient: HttpClient
  ) { }

  // Usage >> Get Products From fake store api
  Products(): Observable<any> { return this.httpClient.get(`${this.ApiUrl}/products`, {params: {limit: environment.limit}}); }

  // Usage >> Get Product Details
  ProductDetails(ProductID: string): Observable<any> { return this.httpClient.get(`${this.ApiUrl}/products/${ProductID}`); }

  // Usage >> Add Product
  AddNewProduct(Data: object): Observable<any> { return this.httpClient.post(`${this.ApiUrl}/products`, Data); }

}
