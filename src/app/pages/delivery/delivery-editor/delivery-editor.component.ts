import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import DevExpress from 'devextreme';
import { SupplierService } from '../../../shared/services/supplier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { WarehouseService } from '../../../shared/services/warehouse.service';
import { ProductService } from '../../../shared/services/product.service';
import CustomStore = DevExpress.data.CustomStore;
import { IDelivery } from '../../../shared/models/delivery';
import { DeliveryService } from '../../../shared/services/delivery.service';
import { CityService } from '../../../shared/services/city.service';
import { IMetaData } from '../../../shared/models/metadata';

@Component({
	selector: 'app-delivery-transfer-editor',
	templateUrl: './delivery-editor.component.html',
	styleUrls: ['./delivery-editor.component.scss']
})
export class DeliveryEditorComponent implements OnInit {

	delivery: IDelivery;
	supplierStore: CustomStore;
	warehouseStore: CustomStore;
	productStore: CustomStore;
	cityStore: CustomStore;

	deliveryItemGridValid = true;
	metaData: IMetaData;

	constructor(
		private supplierService: SupplierService,
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
	}

	ngOnInit(): void {
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
