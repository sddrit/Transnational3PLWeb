import { Component, OnInit } from '@angular/core';
import DevExpress from 'devextreme';
import { confirm } from 'devextreme/ui/dialog';
import { SupplierService } from '../../../shared/services/supplier.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { IMetaData } from '../../../shared/models/metadata';
import CustomStore = DevExpress.data.CustomStore;
import { IDelivery } from '../../../shared/models/delivery';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { AuthService } from '../../../shared/services';

@Component({
	selector: 'app-delivery-list',
	templateUrl: './delivery-list.component.html',
	styleUrls: ['./delivery-list.component.scss']
})
export class DeliveryListComponent implements OnInit {

	metaData: IMetaData;
	deliveryDataSource: CustomStore;
	supplierDataSource: CustomStore;
	warehouseDataSource: CustomStore;

	constructor(private deliveryService: DeliveryService,
				private authService: AuthService,
				private supplierService: SupplierService,
				private warehouseService: WarehouseService,
				private router: Router,
				private loader: LoaderHandler,
				private notify: NotifyHandler,
				private activatedRoute: ActivatedRoute) {
	}

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.warehouseDataSource = this.warehouseService.getWarehouses();

		if (!this.isSupplier()) {
			this.supplierDataSource = this.supplierService.getSuppliers();
		}

		this.deliveryDataSource = this.deliveryService.getDeliveries();
	}

	openDelivery(id: number) {
		this.router.navigate(['/delivery/' + id]);
	}

	isSupplier() {
		return this.authService.isSupplier;
	}
}
