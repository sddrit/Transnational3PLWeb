import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class LoaderHandler {

    private isShowLoader: Subject<boolean> = new Subject<boolean>();
    public displayLoader = this.isShowLoader.asObservable();

    constructor() { }

    show(isShow: boolean) {
        this.isShowLoader.next(isShow);
    }

}
