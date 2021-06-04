import { ISupplier, ISupplierPickupAddress } from '../models/supplier';

export class ModelHelper {

	public static newSupplier(): ISupplier {
		const newModel: ISupplier = {
			id: 0,
			active: true,
			supplierName: "",
			businessRegistrationId: "",
			vatNumber: "",
			address: {
				firstName: "",
				lastName: "",
				addressLine1: "",
				addressLine2: "",
				cityId: null,
				city: null,
				postalCode: ""
			},
            contact: {
              contactPerson: "",
              phone: "",
              mobile: "",
              email: ""
            },
            invoicePolicy: "",
            returnPolicy: "",
            supplierCharges: {
              allocatedUnits: null,
              storageChargePerUnit: null,
              additionalChargePerUnitPrice: null,
              handlingCharge: null
            },
            pickupAddress: [],
            products: []
        };
        return newModel;
    }


    public static newSupplierPickupAddress(): ISupplierPickupAddress {
        const newModel: ISupplierPickupAddress = {
			id: 0,
			firstName: "",
			lastName: "",
			addressLine1: "",
			addressLine2: "",
			cityId: null,
			postalCode: "",
			city: null
		};
        return newModel;
    }
}
