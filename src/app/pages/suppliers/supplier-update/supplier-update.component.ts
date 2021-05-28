import { Component, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DxFormComponent } from 'devextreme-angular';

import { ISupplier, ISupplierPickupAddress } from 'src/app/shared/models/supplier';
import { CityService } from 'src/app/shared/services/city.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';
import { LoaderHandler } from 'src/app/shared/utilities/loader.handler';
import { ModelHelper } from 'src/app/shared/utilities/model.helper';
import { NotifyHandler } from 'src/app/shared/utilities/notify.handler';


@Component({
  templateUrl: 'supplier-update.component.html',
  styleUrls: ['./supplier-update.component.scss']
})

export class SupplierUpdateComponent {
  @ViewChild('pickupAddressUpdateForm') form: DxFormComponent;
  
  public supplier: ISupplier;
  public cities: any;
  public selectedPickupAddress: ISupplierPickupAddress | null = null;
  public isShowPickupAddressUpdatePopup: boolean = false;

  constructor(
    private supplierService: SupplierService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private loader:LoaderHandler,
    private notify:NotifyHandler,
    private cdr: ChangeDetectorRef
  ) {
    this.cities = this.cityService.getCities();
    this.setSupplier();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  private setSupplier() {
    this.supplier = ModelHelper.newSupplier();
    let supplierId = this.route.snapshot.paramMap.get('id');

    if (supplierId !== '0') {
      this.supplierService.getSupplierById(+supplierId).subscribe((data: ISupplier) => {
        this.supplier = data;
      });
    }
  }

  private getCityNameById(id: number) {
    return '';

    // let matchingCity = (this.cities.data as ICity[]).find(c => c.Id == id);
    // return matchingCity ? matchingCity.CityName : '';
  }

  public backToSuppliers() {
    this.router.navigate(['/suppliers']);
  }

  public openAddPickupAddressUpdatePopup() {

    this.selectedPickupAddress = ModelHelper.newSupplierPickupAddress();
    this.isShowPickupAddressUpdatePopup = true;
  }

  public openUpdatePickupAddressUpdatePopup(e: any) {
    this.selectedPickupAddress = JSON.parse(JSON.stringify(e.itemData));
    this.isShowPickupAddressUpdatePopup = true;
  }

  public closePickupAddressUpdatePopup() {
    this.form.instance.resetValues();
    this.selectedPickupAddress = null
    this.isShowPickupAddressUpdatePopup = false;
  }

  public getPickupAddressDisplayStrinng(pickupAddress: ISupplierPickupAddress) {
    let text = pickupAddress.FirstName + " " + pickupAddress.LastName + ", " +
      pickupAddress.AddressLine1 + " " + pickupAddress.AddressLine2 + " " +
      this.getCityNameById(pickupAddress.CityId) + " " + pickupAddress.PostalCode;

    return text;
  }

  public updateSupplier() {
    this.loader.show(true);
    this.supplierService.updateSupplier(this.supplier).subscribe((response: ISupplier) => {
      this.notify.success('Supplier updated successfully');
      this.loader.show(false);
      this.router.navigate(['/suppliers']);
    });
  }

  public addSupplier() {
    this.loader.show(true);
    this.supplierService.addSupplier(this.supplier).subscribe((response: ISupplier) => {
      this.notify.success('Supplier added successfully');
      this.loader.show(false);
      this.router.navigate(['/suppliers']);
    });
  }

  public handleSubmit(e: any) {
    e.preventDefault();

    if (this.supplier.Id === 0) {
      this.addSupplier();
    } else {
      this.updateSupplier();
    }
  }

  public updatePickupAddress() {
    let updatedIndex = this.supplier.PickupAddress.findIndex(p => p.Id === this.selectedPickupAddress.Id);
    if (updatedIndex != -1) {
      this.supplier.PickupAddress[updatedIndex].FirstName = this.selectedPickupAddress.FirstName;
      this.supplier.PickupAddress[updatedIndex].LastName = this.selectedPickupAddress.LastName;
      this.supplier.PickupAddress[updatedIndex].AddressLine1 = this.selectedPickupAddress.AddressLine1;
      this.supplier.PickupAddress[updatedIndex].AddressLine2 = this.selectedPickupAddress.AddressLine2;
      this.supplier.PickupAddress[updatedIndex].CityId = this.selectedPickupAddress.CityId;
      this.supplier.PickupAddress[updatedIndex].PostalCode = this.selectedPickupAddress.PostalCode;
    }
  }

  public addPickupAddress() {
    if (!this.supplier.PickupAddress) {
      this.supplier.PickupAddress = [];
    }
    this.supplier.PickupAddress.push(this.selectedPickupAddress);
  }

  public handlePickupAddressUpdateFormSubmit(e: any) {
    e.preventDefault();

    if (this.selectedPickupAddress.Id === 0) {
      this.addPickupAddress();
    } else {
      this.updatePickupAddress();
    }

    this.isShowPickupAddressUpdatePopup = false;
  }

}

