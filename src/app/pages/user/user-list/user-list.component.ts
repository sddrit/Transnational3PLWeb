import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SupplierService } from 'src/app/shared/services/supplier.service';
import { AuthService } from '../../../shared/services';
import CustomStore from 'devextreme/data/custom_store';


@Component({
	templateUrl: 'user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})

export class UserListComponent implements OnInit {
	userStore: CustomStore;

	constructor(
		private authService: AuthService,
		private router: Router,
	) {
	}


	ngOnInit(): void {
		this.userStore = this.authService.getUsers();
	}

	openUser(id: number) {
		this.router.navigate(['/user/' + id]);
	}

}

