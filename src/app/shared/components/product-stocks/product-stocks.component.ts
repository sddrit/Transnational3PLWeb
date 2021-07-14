import { Component, Input, OnInit } from '@angular/core';
import DevExpress from 'devextreme';
import { StockService } from '../../services/stock.service';
import CustomStore = DevExpress.data.CustomStore;


@Component({
	selector: 'app-product-stocks',
	templateUrl: 'product-stocks.component.html'
})

export class ProductStocksComponent implements OnInit {

	@Input() productId: number;
	@Input() warehouseDataSource: CustomStore;
	productStocksDataSource: CustomStore;

	constructor(
		private stockService: StockService
	) {
	}

	ngOnInit(): void {
		this.productStocksDataSource = this.stockService.getProductStocksByProductId(this.productId);
	}


}

