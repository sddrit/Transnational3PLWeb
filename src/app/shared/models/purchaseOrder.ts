import { ISupplier } from './supplier';
import { IProduct } from './product';

export interface IPurchaseOrderDetails {
	id: number;
	poNumber: string;
	note: string;
	supplierId: number;
	supplier: ISupplier;
	wareHouseId?: null;
	wareHouse?: null;
	purchaseOrderItems: IPurchaseOrderDetailsItem[];
	created: Date;
}

export interface IPurchaseOrderDetailsItem {
	id: number;
	purchaseOrderId: number;
	productId: number;
	product: IProduct;
	quantity: number;
	unitCost: number;
	value: number;
}

export interface IPurchaseOrder {
	id: number;
	poNumber: string;
	created: Date;
	note: string;
	supplierId: number;
	wareHouseId: number;
	purchaseOrderItems: IPurchaseOrderItem[];
}

export interface IPurchaseOrderItem {
	id: number;
	productId: number;
	quantity: number;
	unitCost: number;
}