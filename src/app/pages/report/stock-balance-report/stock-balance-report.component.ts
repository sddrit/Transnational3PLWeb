import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'app-stock-balance-report',
	templateUrl: './stock-balance-report.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./stock-balance-report.component.scss']
})
export class StockBalanceReportComponent implements OnInit {

	title = 'DXReportViewerSample';
	reportUrl = 'StockBalanceReport?supplierId=1';
	hostUrl = 'https://localhost:44361/';
	invokeAction = 'DXXRDV';

	constructor() {
	}

	ngOnInit(): void {
	}

}
