import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { IProduct } from '../../shared/models/product';
import { NotifyHandler } from '../utilities/notify.handler';
import { Router } from '@angular/router';

//TODO: remove later
const sampleProductsData: IProduct[] = [
    {
        id: 1,
        supplierId: 1,
        name: 'Bath soap small',
        description: 'Some sample description on small category',
        storingType: 1,
        unitPrice: 80,
        reorderLevel: 0.8,
        sku: 'WWTYDX',
        storageUnits: 1000,
        weight: 12,
        massUnit: 8,
    },
    {
        id: 2,
        supplierId: 1,
        name: 'Bath soap large',
        description: 'Some sample description on large category',
        storingType: 1,
        unitPrice: 100,
        reorderLevel: 0.9,
        sku: 'SWTYSH',
        storageUnits: 1300,
        weight: 15,
        massUnit: 10,
    },
    {
        id: 3,
        supplierId: 2,
        name: 'Dehydrated milk powder',
        description: 'Some sample description on boxes',
        storingType: 1,
        unitPrice: 450,
        reorderLevel: 1.6,
        sku: 'KKYEVD',
        storageUnits: 600,
        weight: 30,
        massUnit: 10,
    },

]

@Injectable()
export class ProductService extends BaseService {

    constructor(
        public notify: NotifyHandler,
        public router: Router,
    ) {
        super(notify,router);
    }


    public getProducts() {
        return sampleProductsData;
    }

    public getProductById(id: number) {
        return sampleProductsData.find(s => s.id === id);
    }

}

