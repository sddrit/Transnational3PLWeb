import { IWarehouse } from './warehouse';
import { ISupplier } from './supplier';
import { IProduct } from './product';
import { ICity } from './city';

export interface IDelivery {
	id: number;
	supplierId: number;
	wareHouseId?: number;
	deliveryNo: string;
	created: Date;
	updated: Date;
	wareHouse: IWarehouse;
	supplier: ISupplier;
	deliveryCustomer: IDeliveryCustomer;
	deliveryStatus: number;
	deliveryDate: Date;
	deliveryItems: IDeliveryItem[];
	deliveryTrackings: IDeliveryTracking[];
}

export interface IDeliveryItem {
	id: number;
	productId: number;
	product: IProduct;
	quantity: number;
	unitCost: number;
}

export interface IDeliveryCustomer {
	firstName: string;
	lastName: string;
	addressLine1: string;
	addressLine2: string;
	cityId: number;
	city: ICity;
	postalCode: string;
	mobile: string;
	phone: string;
}

export interface IDeliveryTracking {
	id: number;
	trackingNumber: string;
	status: number;
	deliveryTrackingItems: IDeliveryTrackingItem[];
}

export interface IDeliveryTrackingItem {
	id: number;
	productId: number;
	quantity: number;
	unitCost: number;
}
