import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as AspNetData from "devextreme-aspnet-data-nojquery";

import { BaseService } from './base.service';
import { ACCESS_TOKEN_KEY } from '../constants/common';
import { NotifyHandler } from '../utilities/notify.handler';
import { Router } from '@angular/router';


@Injectable()
export class CityService extends BaseService {

    constructor(
        private http: HttpClient,
        public notify: NotifyHandler,
        public router: Router,
    ) {
        super(notify,router);
    }

    public getCities() {
        let token = localStorage.getItem(ACCESS_TOKEN_KEY)
        return AspNetData.createStore({
            key: "Id",
            loadUrl: this.apiUrl+ "/City",
            onBeforeSend: function (method, ajaxOptions) {
                ajaxOptions.headers = { "Authorization": 'Bearer ' + token };
            }
        });
    }

}

