export interface IStoreType {
	id: number;
	name: string;
}

export interface IMassUnit {
	id: number;
	name: string;
}

export interface IDistanceUnit {
	id: number;
	name: string;
}

export interface IStockAdjustmentType {
	id: number;
	name: string;
}

export interface IMetaData {
	storeTypes: IStoreType[];
	massUnits: IMassUnit[];
	distanceUnits: IDistanceUnit[];
	stockAdjustmentTypes: IStockAdjustmentType[];
}
