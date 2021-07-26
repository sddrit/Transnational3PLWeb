import { Component, OnInit } from '@angular/core';
import DevExpress from 'devextreme';
import { SupplierService } from '../../../shared/services/supplier.service';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { IMetaData } from '../../../shared/models/metadata';
import CustomStore = DevExpress.data.CustomStore;
import { IDelivery } from '../../../shared/models/delivery';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';

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

	processingPopupVisible = false;
	currentDelivery: IDelivery;

	processingFormData = {
		requiredNumberOfTrackingNumber: 0
	};

	constructor(private deliveryService: DeliveryService,
				private supplierService: SupplierService,
				private warehouseService: WarehouseService,
				private router: Router,
				private loader: LoaderHandler,
				private notify: NotifyHandler,
				private activatedRoute: ActivatedRoute) {
		this.startProcessing = this.startProcessing.bind(this);
	}

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.warehouseDataSource = this.warehouseService.getWarehouses();
		this.supplierDataSource = this.supplierService.getSuppliers();
		this.deliveryDataSource = this.deliveryService.getDeliveries();
	}

	openDelivery(id: number) {
		this.router.navigate(['/delivery/' + id]);
	}

	startProcessing(e) {
		this.currentDelivery = e.row.data;
		this.processingFormData.requiredNumberOfTrackingNumber = 1;
		this.processingPopupVisible = true;
		e.event.preventDefault();
	}

	isMarkAsProcessingVisible (e) {
		return e.row.data.deliveryStatus === 0;
	}

	handleProcessingForm(e) {
		e.preventDefault();
		this.processingPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsProcessing(this.currentDelivery.id, this.processingFormData.requiredNumberOfTrackingNumber).subscribe(() => {
			this.notify.success('Successfully marked as processing');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

}
