import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class TodayService {
  public url;

  constructor(private _http: Http) { 
    this.url = GLOBAL.url;
  }

  public createReminder(info){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(info);
    let params = json;
    
    return this._http.post(this.url+"createReminder",  params, {headers: headers}).map(res => res.json());  
  }

  public getReminders(){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"getReminders",   {headers: headers}).map(res => res.json());    
  }


  public getReminder(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"getReminder/"+id,   {headers: headers}).map(res => res.json());    
  }

  public editReminder(id, info){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(info);
    let params = json;

    return this._http.put(this.url+"updateReminder/"+id,  params, {headers: headers}).map(res => res);
  }


  public deleteReminder(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.delete(this.url+"deleteReminder/"+id,   {headers: headers}).map(res => res);    
  }

}
