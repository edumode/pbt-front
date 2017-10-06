import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class UserService {
  public url;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
   }

  public show(userTo){
    let data = JSON.stringify(userTo);
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.post(this.url + "login", userTo,  {headers: headers}).map(res => res.json());    
  }

}
