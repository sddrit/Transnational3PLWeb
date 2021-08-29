import { ISupplier } from './supplier';

export interface IProduct {
	id: number;
	code: string;
	supplierId: number;
	supplier: ISupplier;
	name: string;
	description: string;
	storingType?: number;
	unitPrice: number;
	reorderLevel: number;
	sku: string;
	storageUnits: number;
	weight?: number;
	massUnit?: number;
	active: boolean;
	unitOfMeasureId: number;
}

export interface IProductStock {
	id: number;
	wareHouseId: number;
	quantity: number;
	returnQuantity: number;
	productId: number;
}
