import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ACCESS_TOKEN_KEY } from '../constants/common';
import { NotifyHandler } from '../utilities/notify.handler';


@Injectable()
export class BaseService {
  public apiUrl: string = environment.apiUrl;

  constructor(
    public notify: NotifyHandler,
    public router: Router,
  ) { }

  public handleError(error: any, operation?: string, hideToastr?: boolean) {

    // login error to console
    console.error(error);

    // if unauthorized error clear cache & redirect to login
    if (error.status === 401) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      this.notify.error('Session expired. Please login to visit this page');
      this.router.navigateByUrl('/login-form');

    } else {
      // display error message
      if (!hideToastr) {
        this.notify.error('Sorry an error occurred. ' + (operation ? operation + ' failed.' : ''));
      }

      // return error
      return throwError(error.error);
    }
  }

}
