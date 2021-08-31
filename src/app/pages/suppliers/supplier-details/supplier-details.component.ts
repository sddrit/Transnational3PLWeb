import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ISupplier, ISupplierPickupAddress, ISupplierStorage } from '../../../shared/models/supplier';
import { SupplierService } from '../../../shared/services/supplier.service';
import { CityService } from '../../../shared/services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { ModelHelper } from '../../../shared/utilities/model.helper';
import CustomStore from 'devextreme/data/custom_store';
import { AuthService } from '../../../shared/services';
import DataSource from 'devextreme/data/data_source';
import { confirm } from 'devextreme/ui/dialog';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'app-supplier-details',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

	public supplier: ISupplier;
	public supplierStorageDetails: ISupplierStorage;
	public cityStore: CustomStore;
	public userDataSource: DataSource;

	public showCreateAccountPopup = false;

	constructor(
		private supplierService: SupplierService,
		private cityService: CityService,
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
		this.deleteUser = this.deleteUser.bind(this);
		this.setUserStatus = this.setUserStatus.bind(this);
		this.cityStore = this.cityService.getCities();
		this.setSupplier();
	}

	ngOnInit(): void {
	}

	public getPickupAddressDisplayStrinng(pickupAddress: ISupplierPickupAddress) {
		const text = pickupAddress.firstName + ' ' + pickupAddress.lastName + ', ' +
			pickupAddress.addressLine1 + ' ' + pickupAddress.addressLine2 + ' ' +
			pickupAddress.city.cityName + ' ' + pickupAddress.postalCode;
		return text;
	}

	public backToSuppliers() {
		this.router.navigate(['/suppliers']);
	}

	public createAccount(): void {
		this.showCreateAccountPopup = true;
	}

	public onCreateAccount(): void {
		this.notify.success('Successfully created user account');
		this.showCreateAccountPopup = false;
		this.setSupplier();
	}

	public onCreateAccountCancel(): void {
		this.showCreateAccountPopup = false;
	}

	public deleteUser(e: any): void {
		e.event.preventDefault();
		const result = confirm('<i>Are you sure you want to delete this user?</i>', 'Delete User');
		result.then((dialogResult) => {
			if (dialogResult) {
				this.loader.show(true);
				this.authService.deleteUser(e.row.data.id).subscribe(() => {
					this.notify.success('Successfully user deleted');
					this.setSupplier();
				});
			}
		});
	}

	public isActiveButtonVisible(e): boolean {
		return !e.row.data.active;
	}

	public isDeactivateButtonVisible(e): boolean {
		return e.row.data.active;
	}

	public setUserStatus(e: any): void {
		e.event.preventDefault();

		const active: boolean = e.row.data.active;
		let message: string;

		if(active) {
			message = 'Are you sure you want to disable this user?';
		}else {
			message = 'Are you sure you want to enable this user?';
		}

		const result = confirm(`<i>${message}</i>`, 'Change User Status');

		result.then((dialogResult) => {
			if(dialogResult) {
				this.loader.show(true);
				this.authService.setStatus(e.row.data.id, !active).subscribe(() => {
					this.notify.success('Successfully update user status');
					this.setSupplier();
				});
			}
		});

	}

	customizeLabelStorageByWareHouse(arg) {
		return arg.percentText;
	}

	customizeTextForGauge(arg) {
		return arg.valueText + ' %';
	}

	private setSupplier() {
		this.supplier = ModelHelper.newSupplier();
		const supplierId = this.route.snapshot.paramMap.get('id');

		this.loader.show(true);

		if ( supplierId !== '0' ) {
			this.supplierService.getSupplierById(+supplierId).subscribe((data: ISupplier) => {
				this.supplier = data;
				this.userDataSource = this.authService.getSupplierUsers(this.supplier.id);
				this.supplierService.getSupplierStorageDetails(+supplierId).subscribe((supplierStorage: ISupplierStorage) => {
					this.supplierStorageDetails = supplierStorage;
					this.loader.show(false);
				});
			});
		}
	}



}