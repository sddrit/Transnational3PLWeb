import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-stock-balance-report',
	templateUrl: './waybill.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./waybill.scss']
})
export class WaybillComponent implements OnInit {

	title = 'WayBill';
	reportUrl = '';
	hostUrl = `${environment.reportHostUrl}/`;
	invokeAction = 'DXXRDV';

	constructor(private route: ActivatedRoute,
				private router: Router) {
		const id = this.route.snapshot.paramMap.get('id');
		this.reportUrl = `WayBill?id=${id}`;
	}

	ngOnInit(): void {
	}

	backToDelivery() {
		const id = this.route.snapshot.paramMap.get('id');
		this.router.navigate([`/delivery/${id}`]);
	}

	beforeRender(e: any) {
		e.args.reportPreview.zoom(1);
	}

}
