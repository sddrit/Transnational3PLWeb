import { IAddress } from './address';

export interface IWarehouse {
	id: number;
	name: string;
	address: IAddress;
	active: boolean;
}
