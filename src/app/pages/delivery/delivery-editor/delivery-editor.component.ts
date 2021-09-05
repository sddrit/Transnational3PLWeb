import * as moment from 'moment';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import DevExpress from 'devextreme';
import { SupplierService } from '../../../shared/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ProductService } from '../../../shared/services/product.service';
import CustomStore = DevExpress.data.CustomStore;
import { IDelivery, IDeliveryTracking } from '../../../shared/models/delivery';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { CityService } from '../../../shared/services/city.service';
import { IMetaData } from '../../../shared/models/metadata';
import { confirm } from 'devextreme/ui/dialog';
import { AuthService } from '../../../shared/services';
import { DxDataGridComponent, DxFormComponent } from 'devextreme-angular';

@Component({
	selector: 'app-delivery-transfer-editor',
	templateUrl: './delivery-editor.component.html',
	styleUrls: ['./delivery-editor.component.scss']
})
export class DeliveryEditorComponent implements OnInit {

	@ViewChild('dxDataGridDeliveryItems') dataGrid: DxDataGridComponent;
	@ViewChild('completeForm') completeForm: DxFormComponent;
	@ViewChild('customerReturnForm') customerReturnForm: DxFormComponent;

	delivery: IDelivery;
	supplierStore: CustomStore;
	warehouseStore: CustomStore;
	productStore: CustomStore;
	cityStore: CustomStore;

	deliveryItemGridValid = true;
	metaData: IMetaData;

	currentTracking: IDeliveryTracking = {
		id: 0,
		status: 0,
		trackingNumber: null,
		deliveryTrackingItems: []
	};

	processingPopupVisible = false;
	dispatchPopupVisible = false;
	returnPopupVisible = false;
	completePopupVisible = false;

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

	constructor(
		private supplierService: SupplierService,
		private authService: AuthService,
		private warehouseService: WarehouseService,
		private deliveryService: DeliveryService,
		private productService: ProductService,
		private cityService: CityService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
		this.onGridKeyUp = this.onGridKeyUp.bind(this);
		this.onEditorPreparing = this.onEditorPreparing.bind(this);
	}

	ngOnInit(): void {
		document.addEventListener('keydown', (event) => {
			this.onGridKeyUp(event);
		});
		this.productStore = this.productService.getProducts();
		this.supplierStore = this.supplierService.getSuppliers();
		this.warehouseStore = this.warehouseService.getWarehouses();
		this.cityStore = this.cityService.getCities();
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.setDelivery();
	}

	handleSubmit(e: Event) {
		e.preventDefault();
		if ( ! this.deliveryItemGridValid ) {
			this.notify.error('Please check the delivery items');
			return;
		}
		if ( this.delivery.deliveryItems == null || this.delivery.deliveryItems.length == 0 ) {
			this.notify.error('Delivery should have at lease one delivery item');
			return;
		}
		this.loader.show(true);
		this.deliveryService.addDelivery(this.delivery).subscribe(data => {
			this.notify.success('Successfully created delivery');
			this.loader.show(false);
			this.router.navigate(['/deliveries']);
		});
	}

	onRowValidating(e) {
		this.deliveryItemGridValid = e.isValid;
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

	public backToDelivery() {
		this.router.navigate(['/deliveries']);
	}

	processing(e) {
		e.event.preventDefault();
		this.processingFormData.requiredNumberOfTrackingNumber = 1;
		this.processingPopupVisible = true;
	}

	handleProcessingForm(e) {
		e.preventDefault();
		this.processingPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsProcessing(this.delivery.id,
			this.processingFormData.requiredNumberOfTrackingNumber).subscribe(() => {
			this.notify.success('Successfully marked as processing');
			this.loader.show(false);
			this.setDelivery();
		});
	}

	dispatch(e) {
		this.dispatchPopupVisible = true;
		e.event.preventDefault();
	}

	handleDispatchForm(e) {
		e.preventDefault();
		this.dispatchPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsDispatch(this.delivery.id,
			this.dispatchFormData.wareHouseId).subscribe(() => {
			this.notify.success('Successfully marked as dispatched');
			this.loader.show(false);
			this.setDelivery();
		});
	}

	return(e) {
		this.returnPopupVisible = true;
		e.event.preventDefault();
	}

	handleReturnForm(e) {
		e.preventDefault();
		this.returnPopupVisible = false;
		this.loader.show(true);
		this.deliveryService.markAsReturn(this.delivery.id,
			this.returnFormData.note).subscribe(() => {
			this.notify.success('Successfully marked as return');
			this.loader.show(false);
			this.setDelivery();
		});
	}

	markAsComplete(e) {
		e.event.preventDefault();
		this.completePopupVisible = true;
		if (this.completeForm != null) {
			this.completeForm.instance.resetValues();
		}
	}

	handleComplete(e) {
		e.preventDefault();
		const data = this.completeForm.instance.option('formData');
		const trackingNumbers = Object.getOwnPropertyNames(data);
		const selectedTrackingNumbers = trackingNumbers.filter(trackingNumber => {
			return data[trackingNumber];
		});
		this.completePopupVisible = false;
		if (selectedTrackingNumbers.length === 0) {
			this.notify.warning('No any tracking number select for complete this delivery');
			return;
		}
		this.loader.show(true);
		this.deliveryService.markAsComplete(this.delivery.id, selectedTrackingNumbers).subscribe(() => {
			this.notify.success('Successfully marked as completed');
			this.setDelivery();
			this.loader.show(false);
		});
	}

	wayBill(e) {
		e.event.preventDefault();
		this.router.navigate([`/waybill/${this.delivery.id}`]);
	}

	canMarkAsProcessing() {
		return this.delivery.deliveryStatus === 0 && this.delivery.id !== 0;
	}

	canMarkAsDispatch() {
		return this.delivery.deliveryStatus === 1;
	}

	canMarkAsComplete() {
		return this.delivery.deliveryStatus === 2 || this.delivery.deliveryStatus === 3;
	}

	canMarkAsReturn() {
		return this.delivery.deliveryStatus === 4;
	}

	isSupplier() {
		return this.authService.isSupplier;
	}

	disabledDates(args) {
		const date = args.date;
		return moment().add(-1, 'day') > date;
	}

	onEditorPreparing(e) {
		if (e.dataField === 'productId') {
			const standardHandler = e.editorOptions.onValueChanged;
			e.editorOptions.onValueChanged = (editorEvent) => {
				standardHandler(editorEvent);
				this.productService.getProductById(editorEvent.value).subscribe(product => {
					e.component.cellValue(e.row.rowIndex, 'unitCost', product.unitPrice);
					e.component.editCell(e.row.rowIndex, 1);
				});
			};
		}
	}

	onGridKeyUp(e) {
		if (e.altKey && e.key === 'a') {
			this.dataGrid.instance.addRow().then(() => {
				this.dataGrid.instance.editCell(0, 0);
			});
		}
	}

	onTrackingSaveChanges(e) {
		this.loader.show(true);
		this.deliveryService.mapDeliveryProduct(this.delivery).subscribe(delivery => {
			this.delivery = delivery;
			this.loader.show(false);
		});
	}

	getDispatchedTrackings() {
		if (this.delivery == null || this.delivery.deliveryTrackings == null) {
			return [];
		}
		return this.delivery.deliveryTrackings.filter(item => item.status === 1);
	}

	getCompletedOrDispatchedTrackings() {
		if (this.delivery == null || this.delivery.deliveryTrackings == null) {
			return [];
		}
		return this.delivery.deliveryTrackings.filter(item => item.status === 1 || item.status === 2);
	}

	private setDelivery() {
		this.delivery = this.getNewDelivery();
		const deliveryId = this.activatedRoute.snapshot.paramMap.get('id');

		if ( deliveryId !== '0' ) {
			this.deliveryService.getDeliveryById(+deliveryId).subscribe((data: IDelivery) => {
				this.delivery = data;
			});
		}
	}

	private getNewDelivery() {
		return { id: 0, deliveryItems: [], deliveryStatus: 0, supplierId: null, wareHouseId: null, deliveryCustomer: {} } as IDelivery;
	}
}
