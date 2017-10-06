import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class AdminService {
  public url;

  constructor(private _http:Http) {
    this.url = GLOBAL.url;
   }

  public getAllUsers(){
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.get(this.url+"get-users", {headers: headers}).map(res => res.json());
  }

  public createUser(data){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(data);
    let params = json;

    return this._http.post(this.url+"create-user",  params, {headers: headers}).map(res => res);
  }

  public deleteUser(id){
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.delete(this.url+"delete-user/"+id, {headers: headers}).map(res => res);
  }

}
