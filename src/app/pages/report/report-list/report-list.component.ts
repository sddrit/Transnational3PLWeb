import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../../../shared/services/supplier.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import CustomStore from 'devextreme/data/custom_store';
import { ProductService } from '../../../shared/services/product.service';

@Component({
	selector: 'app-report-list',
	templateUrl: './report-list.component.html',
	styleUrls: ['./report-list.component.scss']
})
export class ReportListComponent implements OnInit {

	supplierStore: CustomStore;
	warehouseStore: CustomStore;
	productStore: CustomStore;

	constructor(private supplierService: SupplierService,
				private productservice: ProductService,
				private warehouseService: WarehouseService) {
		this.warehouseStore = this.warehouseService.getWarehouses();
		this.supplierStore = this.supplierService.getSuppliers();
		this.productStore = this.productservice.getProducts();
	}

	ngOnInit(): void {
	}

	submitInventoryBalanceForm(e: Event) {
		e.preventDefault();
		console.log(e);
	}

}
