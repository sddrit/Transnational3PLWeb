import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SupplierService } from 'src/app/shared/services/supplier.service';


@Component({
	templateUrl: 'supplier-list.component.html',
	styleUrls: ['./supplier-list.component.scss']
})

export class SupplierListComponent implements OnInit {
	suppliers: any;

	constructor(
		private supplierService: SupplierService,
		private router: Router,
	) {
	}


	ngOnInit(): void {
		this.suppliers = this.supplierService.getSuppliers();
	}

	openSupplier(id: number) {
		this.router.navigate(['/supplier/' + id]);
	}

	createAccount(e: any, id: number) {
		e.event.stopPropagation();
		this.router.navigate(['/supplier/create-account/' + id]);
	}

}

