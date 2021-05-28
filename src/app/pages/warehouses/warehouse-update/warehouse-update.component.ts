import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { IWarehouse } from 'src/app/shared/models/warehouse';
import { WarehouseService } from 'src/app/shared/services/warehouse.service';


@Component({
  templateUrl: 'warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.scss']
})

export class WarehouseUpdateComponent implements OnInit {
  warehouse: IWarehouse;
  submitButtonOptions = {
    text: "Save",
    useSubmitBehavior: true,
    type:"default",
    class:"btn-save-warehouse"
}
@ViewChild('documentEditForm') documentEditForm: FormGroupDirective; 

  constructor(
    private warehouseService: WarehouseService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit(): void {
    let warehouseId = this.route.snapshot.paramMap.get('id');

    if (warehouseId !== '0') {
      this.warehouse = this.warehouseService.getWarehouseById(+warehouseId);
    } else {
      this.warehouse = this.getNewWarehouse();
    }
  }

  public saveWarehouse(){
    this.router.navigate(['/warehouses']);
  }

  handleSubmit(e:any) {
    this.router.navigate(['/warehouses']);
  }

  private getNewWarehouse() {
    return {
      id: 0,
      name: '',
      location: ''
    } as IWarehouse;
  }

}

