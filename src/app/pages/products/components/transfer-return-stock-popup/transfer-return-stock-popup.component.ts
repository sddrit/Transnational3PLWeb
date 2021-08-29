import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { DxFormComponent } from 'devextreme-angular';
import { LoaderHandler } from '../../../../shared/utilities/loader.handler';
import { StockTransferService } from '../../../../shared/services/stocktransfer.service';
import { WarehouseService } from '../../../../shared/services/warehouse.service';
import { ProductService } from '../../../../shared/services/product.service';
import { IReturnStockTransfer } from '../../../../shared/models/stockTransfer';

@Component({
	selector: 'app-transfer-return-stock-popup',
	templateUrl: './transfer-return-stock-popup.component.html',
	styleUrls: ['./transfer-return-stock-popup.component.scss']
})
export class TransferReturnStockPopupComponent implements OnInit {

	@Input()
	visible = false;

	@Input()
	wareHouseId = 0;

	@Input()
	productId = 0;

	@Input()
	quantity = 0;

	@Input()
	unitCost = 0;

	@Output() onSuccess = new EventEmitter();
	@Output() onCancel = new EventEmitter();

	warehouseStore: CustomStore;
	productStore: CustomStore;

	public returnStockTransfer: IReturnStockTransfer;
	@ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

	constructor(
		private warehouseService: WarehouseService,
		private productService: ProductService,
		private stockTransferService: StockTransferService,
		private loader: LoaderHandler,
	) {
		this.warehouseStore = warehouseService.getWarehouses();
		this.productStore = productService.getProducts();
	}

	ngOnInit(): void {
		this.returnStockTransfer = {
			productId: this.productId,
			wareHouseId: this.wareHouseId,
			quantity: this.quantity,
			unitCost: this.unitCost,
			expiredDate: null,
			note: null
		};
	}

	handleSubmit(e: Event): void {
		e.preventDefault();
		this.stockTransferService.transferReturnStock(this.returnStockTransfer)
			.subscribe(() => {
			this.onSuccess.emit('success');
		});
	}

	onShowingPopup(e: Event): void {
		if (this.form) {
			this.form.instance.resetValues();
		}
		this.returnStockTransfer = {
			productId: this.productId,
			wareHouseId: this.wareHouseId,
			quantity: this.quantity,
			unitCost: this.unitCost,
			expiredDate: null,
			note: null
		};
	}

	onClosePopup(e: Event): void {
		this.onCancel.emit('cancel');
	}


}
