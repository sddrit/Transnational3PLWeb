import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IGrn } from '../../../shared/models/grn';
import { SupplierService } from '../../../shared/services/supplier.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { PurchaseOrderService } from '../../../shared/services/purchaseorder.service';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import DevExpress from 'devextreme';
import CustomStore = DevExpress.data.CustomStore;
import { GrnService } from '../../../shared/services/grn.service';
import { IPurchaseOrder } from '../../../shared/models/purchaseOrder';

@Component({
	selector: 'app-grn-editor',
	templateUrl: './grn-editor.component.html',
	styleUrls: ['./grn-editor.component.scss']
})
export class GrnEditorComponent implements OnInit {

	grn: IGrn;
	supplierStore: CustomStore;
	warehouseStore: CustomStore;
	productStore: CustomStore;
	purchaseOrderStore: CustomStore;

	grnGridItemValid = true;

	constructor(
		private supplierService: SupplierService,
		private grnServie: GrnService,
		private warehouseService: WarehouseService,
		private purchaseOrderService: PurchaseOrderService,
		private productService: ProductService,
		private route: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
		this.onPurchaseOrderChange = this.onPurchaseOrderChange.bind(this);
	}

	ngOnInit(): void {
		this.productStore = this.productService.getProducts();
		this.supplierStore = this.supplierService.getSuppliers();
		this.warehouseStore = this.warehouseService.getWarehouses();
		this.purchaseOrderStore = this.purchaseOrderService.getPurchaseOrders();
		this.setGrn();
	}

	private setGrn() {
		this.grn = this.getNewGrn();
		const grnId = this.route.snapshot.paramMap.get('id');

		if ( grnId !== '0' ) {
			this.grnServie.getById(+grnId).subscribe((data: IGrn) => {
				this.grn = data;
			});
		}
	}

	handleSubmit(e: Event) {
		e.preventDefault();
		if (!this.grnGridItemValid) {
			this.notify.error('Please check the grn items');
			return;
		}
		if (this.grn.goodReceivedNoteItems == null || this.grn.goodReceivedNoteItems.length === 0) {
			this.notify.error('GRN should have at lease one item');
			return;
		}
		this.loader.show(true);
		this.grnServie.addGrn(this.grn).subscribe(data => {
			this.notify.success('Successfully created grn');
			this.loader.show(false);
			this.router.navigate(['/home']);
		});
	}

	onRowValidating(e) {
		this.grnGridItemValid = e.isValid;
	}

	calcualteTotal(rowData) {
		if ( rowData == null ) {
			return 0;
		}
		if ( ! (rowData.unitCost) || ! (rowData.quantity) ) {
			return 0;
		}
		return rowData.unitCost * rowData.quantity;
	}

	onPurchaseOrderChange(e) {
		this.loader.show(true);
		const purchaseOrderId = e.value;
		this.purchaseOrderService.getPurchaseOrderById(purchaseOrderId).subscribe(po => {
			if (po.wareHouseId != null) {
				this.grn.wareHouseId = po.wareHouseId;
			}
			this.grn.supplierId = po.supplierId;
			this.grn.goodReceivedNoteItems = po.purchaseOrderItems.map(item => {
				return {
					id: 0,
					productId: item.productId,
					quantity: item.quantity,
					unitCost: item.quantity,
					expiredDate: null
				};
			});
			this.loader.show(false);
		});
	}

	public backToGrnList() {
		this.router.navigate(['/grn-list']);
	}

	private getNewGrn() {
		return { id: 0, supplierId: null, goodReceivedNoteItems: [], wareHouseId: null, purchaseOrderId: null } as IGrn;
	}
}
