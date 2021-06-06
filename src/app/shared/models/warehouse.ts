import { IAddress } from './address';

export interface IWarehouse {
	id: number;
	code: string;
	name: string;
	address: IAddress;
	active: boolean;
}
