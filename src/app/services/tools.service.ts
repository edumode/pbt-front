import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class ToolsService {
  public url;

  constructor(private _http:Http) {
    this.url = GLOBAL.url;
   }

  public getTools(){
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.get(this.url+"get-tools",   {headers: headers}).map(res => res.json());
  }

  public deleteTool(id){
    let headers = new Headers({'Content-Type':'application/json'});
    
    return this._http.delete(this.url+"delete-tool/"+id,   {headers: headers}).map(res => res);
  }

}
