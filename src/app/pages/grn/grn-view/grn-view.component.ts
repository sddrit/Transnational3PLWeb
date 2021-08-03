import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-stock-balance-report',
	templateUrl: './grn-view.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./grn-view-component.scss']
})
export class GrnViewComponent implements OnInit {

	title = 'WayBill';
	reportUrl = '';
	hostUrl = `https://${environment.apiDomainName}/`;
	invokeAction = 'DXXRDV';

	constructor(private route: ActivatedRoute,
				private router: Router) {
		const id = this.route.snapshot.paramMap.get('id');
		this.reportUrl = `GrnReport?id=${id}`;
	}

	ngOnInit(): void {
	}

	backToGrn() {
		const id = this.route.snapshot.paramMap.get('id');
		this.router.navigate([`/grn/${id}`]);
	}

}
