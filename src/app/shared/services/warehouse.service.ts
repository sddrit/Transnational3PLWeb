import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { IWarehouse } from '../../shared/models/warehouse';
import { Router } from '@angular/router';
import { NotifyHandler } from '../utilities/notify.handler';

//TODO: remove later
const sampleWarehousesData: IWarehouse[] = [
    {
        id: 1,
        name: 'Storage A',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 2,
        name: 'Storage B',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 3,
        name: 'Storage C',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 4,
        name: 'Storage D lower section ',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
 {
        id: 5,
        name: 'Storage D upper section',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 6,
        name: 'Storage A',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 7,
        name: 'Storage U',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    },
    {
        id: 8,
        name: 'Storage building',
        location: '507 - 20th Ave. Main road, Sri Lanka',
 
    }
]

@Injectable()
export class WarehouseService extends BaseService {

    constructor(
        public notify: NotifyHandler,
        public router: Router,
    ) {
        super(notify,router);
    }


    public getWarehouses() {
        return sampleWarehousesData;
    }

    public getWarehouseById(id:number) {
        return sampleWarehousesData.find(s=>s.id === id);
    }

}

