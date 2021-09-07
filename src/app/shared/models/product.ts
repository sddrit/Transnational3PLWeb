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
	height: number;
	width: number;
	length: number;
	weight?: number;
	massUnit?: number;
	active: boolean;
	unitOfMeasureId: number;
}

export interface IProductStock {
	id: number;
	wareHouseId: number;
	quantity: number;
	dispatchReturnQuantity: number;
	damageStockQuantity: number;
	salesReturnQuantity: number;
	productId: number;
}
