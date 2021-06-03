import { ISupplier, ISupplierPickupAddress } from '../models/supplier';

export class ModelHelper {

	public static newSupplier(): ISupplier {
		const newModel: ISupplier = {
			Id: 0,
			Active: true,
			SupplierName: "",
			BusinessRegistrationId: "",
			VatNumber: "",
			Address: {
				FirstName: "",
				LastName: "",
				AddressLine1: "",
				AddressLine2: "",
				CityId: null,
				City: null,
				PostalCode: ""
			},
            Contact: {
              ContactPerson: "",
              Phone: "",
              Mobile: "",
              Email: ""
            },
            InvoicePolicy: "",
            ReturnPolicy: "",
            SupplierCharges: {
              AllocatedUnits: null,
              StorageChargePerUnit: null,
              AdditionalChargePerUnitPrice: null,
              HandlingCharge: null
            },
            PickupAddress: [],
            Products: []
        };
        return newModel;
    }


    public static newSupplierPickupAddress(): ISupplierPickupAddress {
        const newModel: ISupplierPickupAddress = {
			Id: 0,
			FirstName: "",
			LastName: "",
			AddressLine1: "",
			AddressLine2: "",
			CityId: null,
			PostalCode: "",
			City: null
		};
        return newModel;
    }
}
