import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import DevExpress from 'devextreme';
import { StockService } from '../../../../shared/services/stock.service';
import CustomStore = DevExpress.data.CustomStore;
import { DxDataGridComponent } from 'devextreme-angular';
import { IProductStock } from '../../../../shared/models/product';


@Component({
	selector: 'app-product-stocks',
	templateUrl: 'product-stocks.component.html'
})

export class ProductStocksComponent implements OnInit {

	@Input()
	productId: number;
	@Input()
	warehouseDataSource: CustomStore;

	@Output() onTransferReturnStock = new EventEmitter<IProductStock>();

	@ViewChild(DxDataGridComponent, { static: false }) productStocksGrid: DxDataGridComponent;

	productStocksDataSource: CustomStore;

	constructor(
		private stockService: StockService
	) {
		this.transferReturnStock = this.transferReturnStock.bind(this);
	}

	ngOnInit(): void {
		this.productStocksDataSource = this.stockService.getProductStocksByProductId(this.productId);
	}

	public refresh(): void {
		this.productStocksGrid.instance.refresh();
	}

	public transferReturnStock(e) {
		if (!this.onTransferReturnStock) {
			return;
		}
		this.onTransferReturnStock.emit(e.row.data);
	}

}

