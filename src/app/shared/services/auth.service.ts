import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ACCESS_TOKEN_KEY, CURRENT_USER_KEY } from '../constants/common';
import { ILoginModel, ILoginResponseModel } from '../models/auth';
import { NotifyHandler } from '../utilities/notify.handler';
import { BaseService } from './base.service';
import { LoaderHandler } from '../utilities/loader.handler';

const defaultPath = '/';
const defaultUser = {
	email: 'sandra@example.com',
	avatarUrl: 'https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/images/employees/06.png'
};

@Injectable()
export class AuthService extends BaseService {
	private _user = defaultUser;

	constructor(
		private http: HttpClient,
		public notify: NotifyHandler,
		public loader: LoaderHandler,
		public router: Router,
	) {
		super(notify, loader, router);
	}

	get loggedIn(): boolean {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		return (accessToken && accessToken !== '');
	}

	private _lastAuthenticatedPath: string = defaultPath;

	set lastAuthenticatedPath(value: string) {
		this._lastAuthenticatedPath = value;
	}

	public login(loginModel: ILoginModel) {
		return this.http.post<ILoginResponseModel>(this.apiUrl + '/Account', loginModel).pipe(catchError(this.extractError));
	}


	async getUser() {
		try {
			// Send request

			return {
				isOk: true,
				data: this._user
			};
		} catch {
			return {
				isOk: false
			};
		}
	}

	async createAccount(email, password) {
		try {
			// Send request
			console.log(email, password);

			this.router.navigate(['/create-account']);
			return {
				isOk: true
			};
		} catch {
			return {
				isOk: false,
				message: 'Failed to create account'
			};
		}
	}

	async changePassword(email: string, recoveryCode: string) {
		try {
			// Send request
			console.log(email, recoveryCode);

			return {
				isOk: true
			};
		} catch {
			return {
				isOk: false,
				message: 'Failed to change password'
			};
		}
		;
	}

	async resetPassword(email: string) {
		try {
			// Send request
			console.log(email);

			return {
				isOk: true
			};
		} catch {
			return {
				isOk: false,
				message: 'Failed to reset password'
			};
		}
	}

	async logOut() {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(CURRENT_USER_KEY);
		this._user = null;
		this.router.navigate(['/login-form']);
	}


	private extractError(errorData: HttpErrorResponse) {
		let errorMessage = '';

		if ( errorData.error && errorData.error.errors ) {
			errorData.error.errors.forEach(element => {
				errorMessage = errorMessage + ' ' + element.message;
			});
			return throwError((errorMessage !== '') ? errorMessage : 'Sorry an error occurred');
		}
	}

}

@Injectable()
export class AuthGuardService implements CanActivate {
	constructor(private router: Router, private authService: AuthService) {
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		if ( accessToken && accessToken !== '' ) {
			this.authService.lastAuthenticatedPath = route.routeConfig.path;
			return true;
		}

		this.router.navigate(['/login-form'], { queryParams: { returnUrl: state.url } });
		return false;


		// const isLoggedIn = this.authService.loggedIn;
		// const isAuthForm = [
		//   'login-form',
		//   'reset-password',
		//   'create-account',
		//   'change-password/:recoveryCode'
		// ].includes(route.routeConfig.path);

		// if (isLoggedIn && isAuthForm) {
		//   this.authService.lastAuthenticatedPath = defaultPath;
		//   this.router.navigate([defaultPath]);
		//   return false;
		// }

		// if (!isLoggedIn && !isAuthForm) {
		//   this.router.navigate(['/login-form']);
		// }

		// if (isLoggedIn) {
		//   this.authService.lastAuthenticatedPath = route.routeConfig.path;
		// }

		// return isLoggedIn || isAuthForm;
	}
}
