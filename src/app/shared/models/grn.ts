export interface IGrn {
	id: number;
	grnNo: string;
	purchaseOrderId?: number;
	created: Date;
	supplierId: number;
	wareHouseId: number;
	goodReceivedNoteItems: IGrnItem[];
}

export interface IGrnItem {
	id: number;
	productId: number;
	quantity: number;
	unitCost: number;
	expiredDate?: Date;
}
