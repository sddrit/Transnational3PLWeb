import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { PurchaseOrderService } from '../../../shared/services/purchaseorder.service';

@Component({
	selector: 'app-stock-balance-report',
	templateUrl: './purchase-order-print.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['./purchase-order-print-component.scss']
})
export class PurchaseOrderPrintComponent implements OnInit {

	title = 'Purchase Order';
	reportUrl = '';
	hostUrl = `${environment.reportHostUrl}/`;
	invokeAction = 'DXXRDV';

	constructor(private route: ActivatedRoute,
				private router: Router,
				private purchaseOrderService: PurchaseOrderService) {
		const id = this.route.snapshot.paramMap.get('id');
		this.reportUrl = `PurchaseOrder?id=${id}`;
	}

	ngOnInit(): void {
		this.purchaseOrderService.markAsPrinted(+this.route.snapshot.paramMap.get('id')).subscribe(() => {

		});
	}

	beforeRender(e: any) {
		e.args.reportPreview.zoom(1);
	}

}
