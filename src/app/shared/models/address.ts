import { ICity } from './city';

export interface IAddress {
	FirstName: string;
	LastName: string;
	AddressLine1: string;
	AddressLine2: string;
	CityId: number;
	City: ICity;
	PostalCode: string;
}
