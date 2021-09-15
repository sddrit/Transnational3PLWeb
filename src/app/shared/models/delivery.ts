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
	deliveryId: number;
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

export interface IDeliveryStat {
	dayStat: IDeliveryStatItem[];
	weeklyStat: IMonthyDeliveryStateItem[];
}

export interface IMonthyDeliveryStateItem {
	date: Date;
	deliveryStats: IDeliveryStatItem[];
}

export interface IDeliveryStatItem {
	status: number;
	count: number;
}

export interface ILatestDeliveryItemPriceResponse {
	unitPrice: number;
}

export interface ITrackingDetailsItem {
	trackingNo: string;
	inwardedHub: string;
	customerCode: string;
	customerName: string;
	customerAddress: string;
	customerNumber: string;
	receiverName: string;
	receiverAddress: string;
	receiverNumber: string;
	tplwsBatchID: string;
	snicNo: string;
	rnicNo: string;
	toLocation: string;
	area: string;
	itemType: string;
	itemWeight: string;
	taxRegNo: string;
	inwardedBy: string;
	inwardedDate: string;
	codAmount: string;
}

export interface ITrackingDetails {
	isSuccess: string;
	message: string;
	result: ITrackingDetailsItem[];
}
