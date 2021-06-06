import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import DevExpress from 'devextreme';
import CustomStore = DevExpress.data.CustomStore;

import { DxDataGridComponent } from 'devextreme-angular';

import { IPurchaseOrder } from '../../../shared/models/purchaseOrder';
import { SupplierService } from '../../../shared/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { PurchaseOrderService } from '../../../shared/services/purchaseorder.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ProductService } from '../../../shared/services/product.service';

@Component({
	selector: 'app-purchase-order-update',
	templateUrl: './purchase-order-update.component.html',
	styleUrls: ['./purchase-order-update.component.scss']
})
export class PurchaseOrderUpdateComponent implements OnInit {

	purchaseOrder: IPurchaseOrder;
	supplierStore: CustomStore;
	warehouseStore: CustomStore;
	productStore: CustomStore;

	purchaseOrderItemGridValid = true;

	@ViewChild('dxDataGridPurchaseOrderItems') dataGrid: DxDataGridComponent;

	constructor(
		private supplierService: SupplierService,
		private warehouseService: WarehouseService,
		private purchaseOrderService: PurchaseOrderService,
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
	}

	ngOnInit(): void {
		this.productStore = this.productService.getProducts();
		this.supplierStore = this.supplierService.getSuppliers();
		this.warehouseStore = this.warehouseService.getWarehouses();
		this.setPurchaseOrder();
	}

	handleSubmit(e: Event) {
		e.preventDefault();
		if (!this.purchaseOrderItemGridValid) {
			this.notify.error('Please check the purchase order items');
			return;
		}
		if (this.purchaseOrder.purchaseOrderItems == null || this.purchaseOrder.purchaseOrderItems.length == 0) {
			this.notify.error('Purchase order should have at lease one purchase order item');
			return;
		}
		this.loader.show(true);
		if (this.purchaseOrder.id === 0) {
			this.purchaseOrderService.addPurchaseOrder(this.purchaseOrder).subscribe(data => {
				this.notify.success('Successfully created purchase order');
				this.loader.show(false);
				this.router.navigate(['/purchase-orders']);
			});
		}else {
			this.purchaseOrderService.updatePurchaseOrder(this.purchaseOrder).subscribe(data => {
				this.notify.success('Successfully updated purchase order');
				this.loader.show(false);
				this.router.navigate(['/purchase-orders']);
			});
		}
	}

	onRowValidating(e) {
		this.purchaseOrderItemGridValid = e.isValid;
	}

	calcualteTotal(rowData){
		if (rowData == null) {
			return 0;
		}
		if (!(rowData.unitCost) || !(rowData.quantity)) {
			return 0;
		}
		return rowData.unitCost * rowData.quantity;
	}

	private setPurchaseOrder() {
		this.purchaseOrder = this.getNewPurchaseOrder();
		const purchaseOrderId = this.route.snapshot.paramMap.get('id');

		if ( purchaseOrderId !== '0' ) {
			this.purchaseOrderService.getPurchaseOrderById(+purchaseOrderId).subscribe((data: IPurchaseOrder) => {
				this.purchaseOrder = data;
			});
		}
	}

	public backToPurchaseOrders() {
		this.router.navigate(['/purchase-orders']);
	}

	private getNewPurchaseOrder() {
		return { id: 0, supplierId: null, wareHouseId: null, purchaseOrderItems: [] } as IPurchaseOrder;
	}
}
