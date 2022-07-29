import { Component, OnInit } from '@angular/core';
import { ApisService } from "../apis.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  //#region Declaration
  ProductsArr: any[] = [];
  //#endregion Declaration

  constructor(private ApiService: ApisService) { }

  ngOnInit(): void {
    this.GetProducts();
  }

  // Usage >> Fetch products from the service
  GetProducts(): void {
    this.ApiService.Products().subscribe(resp => {
      if (resp) this.ProductsArr = resp;
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
