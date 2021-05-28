import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IWarehouse } from 'src/app/shared/models/warehouse';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';


@Component({
  templateUrl: 'warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})

export class WarehouseListComponent implements OnInit {
   warehouses: IWarehouse[] = [];

  constructor(
    private warehouseService: WarehouseService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.warehouses = this.warehouseService.getWarehouses();
  }

  openWarehouse(id:string) {
    this.router.navigate(['/warehouse/'+id]);
}

}

