import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class GuidelineService {
  public url;

  constructor(private _http:Http) { 
    this.url = GLOBAL.url;
  }

   public getGuideline(){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"getGuideline", {headers: headers}).map(res => res.json());    
  }

  public getOneGuideline(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"getOneGuideline/"+id, {headers: headers}).map(res => res.json());    
  }

  public createGuideline(data){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(data);
    let params = json;

    return this._http.post(this.url+"create-topic",  params, {headers: headers}).map(res => res);  
  }

  public editItemGuide(id, info){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(info);
    let params = json;

    return this._http.put(this.url+"update-topic/"+id,  params, {headers: headers}).map(res => res);
  }

  public deleteGuide(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.delete(this.url+"delete-topic/"+id,   {headers: headers}).map(res => res);
  }

}
