import { Component, ViewEncapsulation } from '@angular/core';
import { DeliveryService } from '../../shared/services/delivery.service';
import { IDeliveryStat } from '../../shared/models/delivery';
import { LoaderHandler } from '../../shared/utilities/loader.handler';
import { ActivatedRoute, Router } from '@angular/router';
import { IMetaData } from '../../shared/models/metadata';

@Component({
	templateUrl: 'home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent {

	metaData: IMetaData;
	deliveryStat: IDeliveryStat;

	pendingCount: number = 0;
	processingCount: number = 0;
	dispatchedCount: number = 0;
	partiallyCompletedCount: number = 0;
	completedCount: number = 0;
	returnCount: number = 0;

	monthlyDeliveryStat: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private loader: LoaderHandler,
		private deliveryService: DeliveryService) {
	}

	ngOnInit(): void {
		this.activatedRoute.data.subscribe(data => {
			this.metaData = data.metadata;
		});
		this.loader.show(true);
		this.deliveryService.getDeliveryStat()
			.subscribe(stat => {
				this.deliveryStat = stat;
				console.log(this.deliveryStat);
				this.setMonthlyDeliveryStat();
				this.pendingCount = this.getDayStat(0);
				this.processingCount = this.getDayStat(1);
				this.dispatchedCount = this.getDayStat(2);
				this.completedCount = this.getDayStat(3);
				this.returnCount = this.getDayStat(4);
				this.loader.show(false);
			});
	}

	getDayStat(status: number) {
		if (!this.deliveryStat) {
			return 0;
		}
		return this.deliveryStat.dayStat
			.filter(item => item.status === status)[0].count;
	}

	customizeTooltipMonthlyStat(arg: any) {
		return {
			text: arg.seriesName + ' Count: ' + arg.valueText
		};
	}

	screen(width) {
		return ( width < 700 ) ? 'sm' : 'lg';
	}

	private setMonthlyDeliveryStat() {
		this.monthlyDeliveryStat = this.deliveryStat.monthlyStat.map(stat => {
			const monthlyStatItem = {
				date: new Date(stat.date)
			};
			stat.deliveryStats.map(deliveryStat => {
				const deliveryStatusName = this.metaData.deliveryStatus.filter(item => {
					return item.id === deliveryStat.status;
				})[0].name;
				monthlyStatItem[deliveryStatusName] = deliveryStat.count;
			});
			return monthlyStatItem;
		});
	}
}
