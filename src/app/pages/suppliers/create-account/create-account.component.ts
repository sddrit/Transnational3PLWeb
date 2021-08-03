import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderHandler } from 'src/app/shared/utilities/loader.handler';
import { NotifyHandler } from 'src/app/shared/utilities/notify.handler';
import { IUser } from '../../../shared/models/auth';
import { DxFormComponent } from 'devextreme-angular';
import { ICreateAccount } from '../../../shared/models/supplier';
import { SupplierService } from '../../../shared/services/supplier.service';

@Component({
	templateUrl: 'create-account.component.html',
	styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

	public account: ICreateAccount;
	@ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

	constructor(
		private supplierService: SupplierService,
		private route: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
		this.account = this.newAccount();
	}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	public backToSuppliers() {
		this.router.navigate(['/suppliers']);
	}

	public createAccount() {
		this.loader.show(true);
		this.supplierService.createAccount(this.account)
			.subscribe((response: IUser) => {
			this.notify.success('Successfully account created');
			this.loader.show(false);
			this.router.navigate(['/suppliers']);
		});
	}

	public handleSubmit(e: any) {
		e.preventDefault();
		this.createAccount();
	}

	public passwordComparison = () => {
		return this.form.instance.option('formData').password;
	}

	private newAccount(): ICreateAccount {
		const supplierId = this.route.snapshot.paramMap.get('id');
		return {
			supplierId: +supplierId,
			username: null,
			email: null,
			active: true,
			password: null,
			confirmPassword: null
		};
	}
}

