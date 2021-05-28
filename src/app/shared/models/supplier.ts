import { IAddress } from "./address";
import { IProduct } from "./product";

export interface ISupplier {
    Id: number;
    Active: boolean;
    SupplierName: string;
    BusinessRegistrationId: string;
    VatNumber: string;
    Address: IAddress;
    Contact: IContact;
    InvoicePolicy: string;
    ReturnPolicy: string;
    SupplierCharges: ISupplierCharges;
    PickupAddress: ISupplierPickupAddress[];
    Products: IProduct[];
}

export interface IContact {
    ContactPerson: string;
    Phone: string;
    Mobile: string;
    Email: string;
}

export interface ISupplierCharges {
    AllocatedUnits: number;
    StorageChargePerUnit: number;
    AdditionalChargePerUnitPrice: number;
    HandlingCharge: number;
}

export interface ISupplierPickupAddress extends IAddress {
    Id: number;
}
