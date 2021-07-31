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
	dispatchPopupVisible = false;
	returnPopupVisible = false;
	customerReturnPopupVisible = false;

	currentDelivery: IDelivery;

	processingFormData = {
		requiredNumberOfTrackingNumber: 0
	};

	dispatchFormData = {
		wareHouseId: null
	};

	returnFormData = {
		note: null
	};

	customerReturnFormData = {
		note: null
	};

	constructor(private deliveryService: DeliveryService,
				private supplierService: SupplierService,
				private warehouseService: WarehouseService,
				private router: Router,
				private loader: LoaderHandler,
				private notify: NotifyHandler,
				private activatedRoute: ActivatedRoute) {
		this.processing = this.processing.bind(this);
		this.dispatch = this.dispatch.bind(this);
		this.markAsComplete = this.markAsComplete.bind(this);
		this.return = this.return.bind(this);
		this.customerReturn = this.customerReturn.bind(this);
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

	processing(e) {
		e.event.preventDefault();
		this.currentDelivery = e.row.data;
		this.processingFormData.requiredNumberOfTrackingNumber = 1;
		this.processingPopupVisible = true;
	}

	handleProcessingForm(e) {
		e.preventDefault();
		this.processingPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsProcessing(this.currentDelivery.id,
			this.processingFormData.requiredNumberOfTrackingNumber).subscribe(() => {
			this.notify.success('Successfully marked as processing');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

	dispatch(e) {
		this.currentDelivery = e.row.data;
		this.dispatchPopupVisible = true;
		e.event.preventDefault();
	}

	handleDispatchForm(e) {
		e.preventDefault();
		this.dispatchPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsDispatch(this.currentDelivery.id,
			this.dispatchFormData.wareHouseId).subscribe(() => {
			this.notify.success('Successfully marked as dispatched');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

	markAsComplete(e) {
		this.currentDelivery = e.row.data;
		e.event.preventDefault();
		const result = confirm("<i>Are you sure you want to complete this delivery?</i>", "Complete Delivery");
		result.then((dialogResult) => {
			console.log(dialogResult);
			if (dialogResult) {
				this.loader.show(true);
				this.deliveryService.markAsComplete(this.currentDelivery.id).subscribe(() => {
					this.notify.success('Successfully marked as complete');
					this.loader.show(false);
					this.router.navigate(['/deliveries']);
				});
			}
		});
	}

	return(e) {
		this.currentDelivery = e.row.data;
		this.returnPopupVisible = true;
		e.event.preventDefault();
	}

	handleReturnForm(e) {
		e.preventDefault();
		this.returnPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsReturn(this.currentDelivery.id,
			this.returnFormData.note).subscribe(() => {
			this.notify.success('Successfully marked as return');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

	customerReturn(e) {
		this.currentDelivery = e.row.data;
		this.customerReturnPopupVisible = true;
		e.event.preventDefault();
	}

	handleCustomerReturnForm(e) {
		e.preventDefault();
		this.customerReturnPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsCustomerReturn(this.currentDelivery.id,
			this.customerReturnFormData.note).subscribe(() => {
			this.notify.success('Successfully marked as customer return');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

	canMarkAsProcessing (e) {
		return e.row.data.deliveryStatus === 0;
	}

	canMarkAsDispatch(e) {
		return e.row.data.deliveryStatus === 1;
	}

	canMarkAsComplete(e) {
		return e.row.data.deliveryStatus === 2;
	}

	canMarkAsReturn(e) {
		return e.row.data.deliveryStatus === 3;
	}

	canMarkAsCustomerReturn(e) {
		return e.row.data.deliveryStatus === 3;
	}
}
