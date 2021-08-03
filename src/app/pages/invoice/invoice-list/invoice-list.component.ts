import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { confirm } from 'devextreme/ui/dialog';
import DevExpress from 'devextreme';
import { SupplierService } from '../../../shared/services/supplier.service';
import { IMetaData } from '../../../shared/models/metadata';
import { MetadataService } from '../../../shared/services/metadata.service';
import CustomStore = DevExpress.data.CustomStore;
import { InvoiceService } from '../../../shared/services/invoice.service';
import { LoaderHandler } from '../../../shared/utilities/loader.handler';
import { NotifyHandler } from '../../../shared/utilities/notify.handler';
import { DxDataGridComponent } from 'devextreme-angular';


@Component({
	templateUrl: 'invoice-list.component.html',
	styleUrls: ['./invoice-list.component.scss']
})

export class InvoiceListComponent implements OnInit {

	@ViewChild('grid') grid: DxDataGridComponent;

	metaData: IMetaData;
	invoiceStore: CustomStore;
	supplierStore: CustomStore;

	constructor(
		private invoiceService: InvoiceService,
		private metadataService: MetadataService,
		private supplierService: SupplierService,
		private loader: LoaderHandler,
		private notify: NotifyHandler,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {
		this.markAsPaid = this.markAsPaid.bind(this);
	}

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.invoiceStore = this.invoiceService.getInvoices();
		this.supplierStore = this.supplierService.getSuppliers();
		this.viewInvoice = this.viewInvoice.bind(this);
	}

	markAsPaid(e): void {
		e.event.preventDefault();
		const result = confirm("<i>Are you sure you want mark this invoice as paid?</i>", "Mark as paid");
		result.then((dialogResult) => {
			if (dialogResult) {
				this.loader.show(false);
				this.invoiceService.markAsPaid(e.row.data.id).subscribe(() => {
					this.loader.show(false);
					this.notify.success('Successfully marked as paid');
					this.grid.instance.refresh();
				});
			}
		});
	}

	viewInvoice(e) {
		e.event.preventDefault();
		this.router.navigate(['/invoice/' + e.row.data.id]);
	}

	canMarkAsPaid (e) {
		return !e.row.data.paid;
	}
}

