import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApisService } from "../services/apis.service";
import Swal from 'sweetalert2'
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: [ './add-product.component.scss' ]
})
export class AddProductComponent implements OnInit {

  //#region Declaration
  AddProductForm: FormGroup;
  ImageURL: string;
  Submitted = false;
  Loading = false;

  //#endregion Declaration

  constructor( private formBuilder: FormBuilder, private ApiService: ApisService, private router: Router ) {
  }

  ngOnInit(): void {
    //#region initialize form
    this.AddProductForm = this.formBuilder.group({
      title: [ '', Validators.required ],
      price: [ null, Validators.required ],
      description: [ '', Validators.required ],
      image: [ null, Validators.required ],
      category: [ '', Validators.required ],
    });
    //#endregion initialize form
  }

  // Image Preview
  /*  showPreview( event ) {
      if (event && event.target) {
        const element = (event.target as HTMLInputElement);
        if (element && element.files) {
          const image = element?.files[0];
          // File Preview
          const reader = new FileReader();
          reader.onload = () => this.ImageURL = reader.result as string;
          reader.readAsDataURL(image)
        }
      }
    }*/

  // Usage >> Submit
  AddProduct(): void {
    this.Submitted = true;
    if (this.AddProductForm.valid) {
      this.Loading = true;

      this.ApiService.AddNewProduct(this.AddProductForm.value).subscribe(resp => {
        this.Loading = false;
        Swal.fire(
          'Add product',
          'The product has been successfully added',
          'success'
        );
        this.router.navigateByUrl('/products'); // Back to products page
      }, error => {
        console.error(error.message);
        Swal.fire(
          'Oop!',
          'Something went wrong',
          'error'
        );
      })
    }
  }
}
