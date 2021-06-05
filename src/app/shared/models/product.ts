import { ISupplier } from './supplier';

export interface IProduct {
	id: number;
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
}
