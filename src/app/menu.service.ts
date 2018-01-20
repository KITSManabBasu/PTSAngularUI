import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class MenuService {
  private _listners = new Subject<any>();
  private _listners1 = new Subject<any>();

  listenLogin(): Observable<any> {
    return this._listners.asObservable();
  }

  listenLogout(): Observable<any> {
    return this._listners1.asObservable();
  }

  loadMenu() {
    this._listners.next();
  }

  unLoadMenu() {
    this._listners1.next();
  }
}
