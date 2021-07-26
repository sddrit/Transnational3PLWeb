import { Injectable } from '@angular/core';

import { BaseService } from './base.service';
import { NotifyHandler } from '../utilities/notify.handler';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ACCESS_TOKEN_KEY } from '../constants/common';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoaderHandler } from '../utilities/loader.handler';
import { IDelivery } from '../models/delivery';

@Injectable()
export class DeliveryService extends BaseService {

	constructor(
		private http: HttpClient,
		public notify: NotifyHandler,
		public loader: LoaderHandler,
		public router: Router,
	) {
		super(notify, loader, router);
	}

	public getDeliveries() {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);
		return AspNetData.createStore({
			key: 'id',
			loadUrl: this.apiUrl + '/Delivery',
			onBeforeSend(method, ajaxOptions) {
				ajaxOptions.headers = { Authorization: 'Bearer ' + token };
			}
		});
	}

	public getDeliveryById(id: number): Observable<IDelivery> {
		return this.http.get<IDelivery>(this.apiUrl + '/Delivery/get-delivery/' + id)
			.pipe(catchError(e => this.handleError(e, 'Getting delivery by id')));
	}

	public addDelivery(delivery: IDelivery) {
		return this.http.post(this.apiUrl + '/Delivery', delivery)
			.pipe(catchError(e => this.handleError(e, 'Create delivery')));
	}

	public markAsProcessing(deliveryId: number, requiredTrackingNumbers: number) {
		return this.http.post(this.apiUrl + '/Delivery/mark-as-processing',
			{ deliveryId, requiredTrackingNumberCount: requiredTrackingNumbers })
			.pipe(catchError(e => this.handleError(e, 'Mark as processing')));
	}
}
