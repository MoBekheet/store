import { Component, OnInit } from '@angular/core';
import { ApisService } from "../apis.service";
import { ActivatedRoute } from "@angular/router";
import { ProductResponse } from "../../model/product";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: [ './product-details.component.scss' ]
})
export class ProductDetailsComponent implements OnInit {

  //#region Declaration
  Product: ProductResponse = {};
  //#endregion Declaration

  constructor( private activatedRoute: ActivatedRoute,
               private ApiService: ApisService ) {
  }

  ngOnInit(): void {
    const ID = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.GetProduct(ID)
  }

  // Usage >> Fetch products from the service
  GetProduct( ProductID: string ): void {
    if (ProductID)
      this.ApiService.ProductDetails(ProductID).subscribe(( resp: ProductResponse ) => {
        if (resp) this.Product = resp;
      }, error => {
        console.error(error.message);
        Swal.fire(
          'Oop!',
          'Something went wrong',
          'error'
        );
      });
  }

}
