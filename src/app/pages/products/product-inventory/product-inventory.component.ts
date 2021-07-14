import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import DevExpress from 'devextreme';
import { IMetaData } from '../../../shared/models/metadata';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';
import CustomStore = DevExpress.data.CustomStore;


@Component({
	templateUrl: 'product-inventory.component.html',
	styleUrls: ['./product-inventory.component.scss']
})

export class ProductInventoryComponent {

	productId: number = null;
	metaData: IMetaData = { stockAdjustmentTypes: [] } as IMetaData;
	warehouseDataSource: CustomStore;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private warehouseService: WarehouseService
	) {
		const productIdFromRoute = this.route.snapshot.paramMap.get('id');

		if ( productIdFromRoute != '0' ) {
			this.productId = +productIdFromRoute;
		}

		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});

		this.warehouseDataSource = this.warehouseService.getWarehouses();

	}

	backToList() {
		this.router.navigate(['/products']);
	}

}

