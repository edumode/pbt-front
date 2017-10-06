import { Injectable } from '@angular/core';
import {Http, Response, Headers} from "@angular/http";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";

import { GLOBAL } from "./global"

@Injectable()
export class ArticlesService {
  public url;

  constructor(private _http:Http) {
    this.url = GLOBAL.url;
   }

  public getArticles(){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"get-releases",  {headers: headers}).map(res => res.json());
  }

  public getArticleSection(sec){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"get-releases-section/"+sec,  {headers: headers}).map(res => res.json());
  }

  public createArticle(data){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(data);
    let params = json;

    return this._http.post(this.url+"create-release",  params, {headers: headers}).map(res => res);
  }

  public getRelease(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.get(this.url+"get-release/"+id,  {headers: headers}).map(res => res.json());
  }

   public updateArticle(id, toUpdate){
    let headers = new Headers({'Content-Type':'application/json'});

    let json = JSON.stringify(toUpdate);
    let params = json;

    return this._http.put(this.url+"update-release/"+id, params, {headers: headers}).map(res => res)
  }

  public deleteArticle(id){
    let headers = new Headers({'Content-Type':'application/json'});

    return this._http.delete(this.url+"delete-release/"+id,  {headers: headers}).map(res => res)
  }

}
