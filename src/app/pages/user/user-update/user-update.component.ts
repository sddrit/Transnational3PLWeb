import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoaderHandler } from 'src/app/shared/utilities/loader.handler';
import { NotifyHandler } from 'src/app/shared/utilities/notify.handler';
import { IUser } from '../../../shared/models/auth';
import { AuthService } from '../../../shared/services';
import { DxFormComponent } from 'devextreme-angular';

interface IUserModel {
	id: number;
	username: string;
	email: string;
	active: boolean;
	password: string;
	confirmationPassword: string;
}

@Component({
	templateUrl: 'user-update.component.html',
	styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {

	public user: IUserModel;
	@ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute,
		private router: Router,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private cdr: ChangeDetectorRef
	) {
		this.setUser();
	}

	ngAfterViewInit() {
		this.cdr.detectChanges();
	}

	public backToUsers() {
		this.router.navigate(['/users']);
	}

	public updateUser() {
		this.loader.show(true);
		this.authService.updateUser(this.user).subscribe((response: IUser) => {
			this.notify.success('User updated successfully');
			this.loader.show(false);
			this.router.navigate(['/users']);
		});
	}

	public addUser() {
		this.loader.show(true);
		this.authService.createUser({...this.user}, this.user.password)
			.subscribe((response: IUser) => {
			this.notify.success('User added successfully');
			this.loader.show(false);
			this.router.navigate(['/users']);
		});
	}

	public handleSubmit(e: any) {
		e.preventDefault();
		if ( this.user.id === 0 ) {
			this.addUser();
		} else {
			this.updateUser();
		}
	}

	public passwordComparison = () => {
		return this.form.instance.option('formData').password;
	}

	private setUser() {
		this.user = this.newUser();
		const userId = this.route.snapshot.paramMap.get('id');
		if ( userId !== '0' ) {
			this.authService.getUserById(+userId).subscribe((data: IUser) => {
				this.user = {...data, password: null, confirmationPassword: null};
			});
		}
	}

	private newUser(): IUserModel {
		return {
			id: 0,
			username: null,
			email: null,
			active: true,
			password: null,
			confirmationPassword: null
		};
	}
}

