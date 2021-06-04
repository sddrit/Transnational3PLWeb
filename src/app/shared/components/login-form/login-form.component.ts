import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';

import { ACCESS_TOKEN_KEY, CURRENT_USER_KEY } from '../../constants/common';
import { ILoginModel, ILoginResponseModel } from '../../models/auth';
import { AuthService } from '../../services';


@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

	public loginModel: ILoginModel = { userName: '', password: '' };
	public isLoading: boolean = false;
	public errorMessage: string = '';
	private returnUrl: string = '/';

	constructor(
		private router: Router,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute
	) {
	}


	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			if ( params.returnUrl ) {
				this.returnUrl = params.returnUrl;
			}
		});
	}


	public login(e: any) {
		e.preventDefault();

		this.isLoading = true;
		this.authService.login(this.loginModel).subscribe((data: ILoginResponseModel) => {
				localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
				localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(data.user));
				this.router.navigate([this.returnUrl]);
			},
			(errorText: string) => {
				this.errorMessage = errorText;
				this.isLoading = false;
			});
	}

}

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		DxFormModule,
		DxLoadIndicatorModule,
	],
	declarations: [LoginFormComponent],
	exports: [LoginFormComponent]
})
export class LoginFormModule {
}
