import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-report-viewer',
	templateUrl: './report-viewer.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: [
		'./report-viewer.component.scss']
})
export class ReportViewerComponent implements OnInit {

	title = '3PL Reports';
	reportUrl = '';
	hostUrl = `${environment.reportHostUrl}/`;
	invokeAction = 'DXXRDV';

	constructor(private route: ActivatedRoute,
				private router: Router) {
		const reportName = this.route.snapshot.paramMap.get('name');
		const queryParameters = this.route.snapshot.queryParams;
		const queryString = Object.keys(queryParameters).map(key => key + '=' + queryParameters[key]).join('&');
		this.reportUrl = `${reportName}?${queryString}`;
	}

	ngOnInit(): void {
	}

}
