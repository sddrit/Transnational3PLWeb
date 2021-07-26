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
import { PurchaseOrderListComponent } from './pages/purchase-order/purchase-order-list/purchase-order-list.component';
import { PurchaseOrderUpdateComponent } from './pages/purchase-order/purchase-order-update/purchase-order-update.component';
import { SupplierPickupAddressModalComponent } from './pages/suppliers/supplier-update/supplier-pickup-address-modal/supplier-pickup-address-modal.component';

import { MetadataResolver } from './shared/resolvers/metadata.resolver';
import { GrnEditorComponent } from './pages/grn/grn-editor/grn-editor.component';
import { GrnListComponent } from './pages/grn/grn-list/grn-list.component';
import { ProductInventoryComponent } from './pages/products/product-inventory/product-inventory.component';
import { ProductStocksComponent } from './shared/components/product-stocks/product-stocks.component';
import { ProductStockAdjustmentsComponent } from './shared/components/product-stock-adjustments/product-stock-adjustments.component';
import { StockTransferListComponent } from './pages/stock-transfer/stock-transfer-list/stock-transfer-list.component';
import { StockTransferEditorComponent } from './pages/stock-transfer/stock-transfer-editor/stock-transfer-editor.component';
import { DeliveryListComponent } from './pages/delivery/delivery-list/delivery-list.component';
import { DeliveryEditorComponent } from './pages/delivery/delivery-editor/delivery-editor.component';


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
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'product/:id',
		component: ProductUpdateComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'product-inventory/:id',
		component: ProductInventoryComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'purchase-orders',
		component: PurchaseOrderListComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'purchase-order/:id',
		component: PurchaseOrderUpdateComponent,
		canActivate: [AuthGuardService]
	},
	{
		path: 'grn/:id',
		component: GrnEditorComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'grn-list',
		component: GrnListComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'stock-transfers',
		component: StockTransferListComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'stock-transfer/:id',
		component: StockTransferEditorComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'deliveries',
		component: DeliveryListComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: 'delivery/:id',
		component: DeliveryEditorComponent,
		canActivate: [AuthGuardService],
		resolve: {
			metadata: MetadataResolver
		}
	},
	{
		path: '**',
		redirectTo: 'suppliers'
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
		ProductUpdateComponent,
		ProductInventoryComponent,
		PurchaseOrderListComponent,
		PurchaseOrderUpdateComponent,
		GrnEditorComponent,
		GrnListComponent,
		ProductStocksComponent,
		ProductStockAdjustmentsComponent,
		StockTransferListComponent,
		StockTransferEditorComponent,
		DeliveryListComponent,
		DeliveryEditorComponent
	]
})
export class AppRoutingModule {
}
