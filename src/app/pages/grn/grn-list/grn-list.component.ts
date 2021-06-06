import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from '../../../shared/services/purchaseorder.service';
import { SupplierService } from '../../../shared/services/supplier.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import DevExpress from 'devextreme';
import CustomStore = DevExpress.data.CustomStore;
import { GrnService } from '../../../shared/services/grn.service';

@Component({
	selector: 'app-grn-list',
	templateUrl: './grn-list.component.html',
	styleUrls: ['./grn-list.component.scss']
})
export class GrnListComponent implements OnInit {

	purchaseOrderDataSource: CustomStore;
	supplierDataSource: CustomStore;
	warehouseDataSource: CustomStore;
	grnDataSource: CustomStore;

	constructor(private purchaseOrderServie: PurchaseOrderService,
				private grnService: GrnService,
				private supplierService: SupplierService,
				private warehouseService: WarehouseService,
				private router: Router,
				private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.grnDataSource = this.grnService.getGrns();
		this.warehouseDataSource = this.warehouseService.getWarehouses();
		this.supplierDataSource = this.supplierService.getSuppliers();
		this.purchaseOrderDataSource = this.purchaseOrderServie.getPurchaseOrders();
	}

	openGrn(id: number) {
		this.router.navigate(['/grn/' + id]);
	}

}
