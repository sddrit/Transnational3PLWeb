import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  templateUrl: 'product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
   products: IProduct[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  openProduct(id:number) {
    this.router.navigate(['/product/'+id]);
}

}

