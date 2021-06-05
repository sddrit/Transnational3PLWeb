import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import DevExpress from 'devextreme';
import { SupplierService } from '../../../shared/services/supplier.service';
import { IMetaData } from '../../../shared/models/metadata';
import { MetadataService } from '../../../shared/services/metadata.service';
import { IProduct } from '../../../shared/models/product';
import CustomStore = DevExpress.data.CustomStore;


@Component({
	templateUrl: 'product-list.component.html',
	styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {

	metaData: IMetaData;
	productStore: CustomStore;
	supplierStore: CustomStore;

	constructor(
		private productService: ProductService,
		private metadataService: MetadataService,
		private supplierService: SupplierService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
	}


	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.productStore = this.productService.getProducts();
		this.supplierStore = this.supplierService.getSuppliers();
	}

	openProduct(id: number) {
		this.router.navigate(['/product/' + id]);
	}

}

