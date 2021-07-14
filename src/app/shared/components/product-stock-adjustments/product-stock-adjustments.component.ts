import { Component, Input, OnInit } from '@angular/core';
import DevExpress from 'devextreme';
import { StockService } from '../../services/stock.service';
import { IStockAdjustmentType } from '../../models/metadata';
import CustomStore = DevExpress.data.CustomStore;


@Component({
	selector: 'app-product-stock-adjustments',
	templateUrl: 'product-stock-adjustments.component.html'
})

export class ProductStockAdjustmentsComponent implements OnInit {

	@Input() productId: number;
	@Input() stockAdjustmentTypes: IStockAdjustmentType[];
	@Input() warehouseDataSource: CustomStore;

	stockAdjustmentsDataSource: CustomStore;


	constructor(
		private stockService: StockService
	) {
	}

	ngOnInit(): void {
		this.stockAdjustmentsDataSource = this.stockService.getProductStockAdjustmentsByProductId(this.productId);
	}


}

