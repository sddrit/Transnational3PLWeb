import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
	DxButtonModule,
	DxCheckBoxModule,
	DxDataGridModule,
	DxFormModule,
	DxListModule,
	DxLoadIndicatorModule,
	DxPopupModule,
	DxSelectBoxModule,
	DxTextAreaModule,
	DxToastModule
} from 'devextreme-angular';

import {
	ChangePasswordFormComponent,
	CreateAccountFormComponent,
	LoginFormComponent,
	ResetPasswordFormComponent
} from './shared/components';

import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SupplierListComponent } from './pages/suppliers/supplier-list/supplier-list.component';
import { WarehouseListComponent } from './pages/warehouses/warehouse-list/warehouse-list.component';
import { SupplierUpdateComponent } from './pages/suppliers/supplier-update/supplier-update.component';
import { WarehouseUpdateComponent } from './pages/warehouses/warehouse-update/warehouse-update.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductUpdateComponent } from './pages/products/product-update/product-update.component';

import { SupplierPickupAddressModalComponent } from './pages/suppliers/supplier-update/supplier-pickup-address-modal/supplier-pickup-address-modal.component';

const routes: Routes = [
	{
		path: 'login-form',
		component: LoginFormComponent
	},
	{
		path: 'tasks',
		component: TasksComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'profile',
		component: ProfileComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'reset-password',
		component: ResetPasswordFormComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'create-account',
		component: CreateAccountFormComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'change-password/:recoveryCode',
		component: ChangePasswordFormComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'suppliers',
		component: SupplierListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'supplier/:id',
		component: SupplierUpdateComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'warehouses',
		component: WarehouseListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'warehouse/:id',
		component: WarehouseUpdateComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'products',
		component: ProductListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'product/:id',
		component: ProductUpdateComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: '**',
		redirectTo: 'home'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true }),
		CommonModule,
		DxDataGridModule,
		DxFormModule,
		DxButtonModule,
		DxToastModule,
		DxTextAreaModule,
		DxLoadIndicatorModule,
		DxListModule,
		DxPopupModule,
		DxSelectBoxModule,
		DxCheckBoxModule
	],
	providers: [AuthGuardService],
	exports: [RouterModule, SupplierPickupAddressModalComponent],
	declarations: [
		HomeComponent,
		ProfileComponent,
		TasksComponent,
		SupplierListComponent,
		SupplierUpdateComponent,
		WarehouseListComponent,
		WarehouseUpdateComponent,
		SupplierPickupAddressModalComponent,
		ProductListComponent,
		ProductUpdateComponent
	]
})
export class AppRoutingModule {
}
