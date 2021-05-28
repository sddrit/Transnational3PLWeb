import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  templateUrl: 'product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})

export class ProductUpdateComponent implements OnInit {
  product: IProduct;
  submitButtonOptions = {
    text: "Save",
    useSubmitBehavior: true,
    type:"default",
    class:"btn-save-product"
}
@ViewChild('documentEditForm') documentEditForm: FormGroupDirective; 


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');

    if (productId !== '0') {
      this.product = this.productService.getProductById(+productId);
    } else {
      this.product = this.getNewProduct();
    }
  }

  public saveProduct(){
    this.router.navigate(['/products']);
  }

  handleSubmit(e:any) {
    this.router.navigate(['/products']);
  }

  private getNewProduct() {
    return {

    } as IProduct;
  }

}

