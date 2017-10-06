import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import {ElementRef} from '@angular/core';
declare var jQuery:any;

import {Articles} from '../../models/articles';
import { ToolsService } from '../../services/tools.service';

import { GLOBAL } from "../../services/global"

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ArticlesService, ToolsService]
})
export class ArticlesComponent implements OnInit {
  public title:String;
  public article:Articles;
  public date;
  public data;
  public tools;
  public url;
  public img;
  //
  public name;
  public role;
  

  constructor(private _articlesService:ArticlesService,
              private _toolsService:ToolsService,
              private _elRef: ElementRef) { 

    this.article = new Articles("","","","","","","");    
    this.url = GLOBAL.url;
    
    let name = localStorage.getItem("name");
    let role = localStorage.getItem("role");

    let nameSplit = name.split('"');
    let roleSplit = role.split('"');

    this.name = nameSplit[1];
    this.role = roleSplit[1];
  }

  ngOnInit() {
    this._articlesService.getArticles().subscribe(
      response => {
        this.data = response;
        console.log(this.data)
      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )

    this._toolsService.getTools().subscribe(
      response => {
        this.tools = response;
      }, error => {
        var errorMessage = <any>error;
        
        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
  }

  public createArticle(){
    this.article = new Articles("","","","","","","");  
    jQuery(this._elRef.nativeElement).find("#createArticle").summernote();
  }

  public createItem(){
    var title = jQuery(this._elRef.nativeElement).find("#myModal").find("#title").val();
    var topic = jQuery(this._elRef.nativeElement).find("#myModal").find("#topic").val();
    var description = jQuery(this._elRef.nativeElement).find("#myModal").find("#description").val();
    var section = jQuery(this._elRef.nativeElement).find("#myModal").find("#section").val();
    var date = jQuery(this._elRef.nativeElement).find("#myModal").find("#date").val();
    var text = jQuery(this._elRef.nativeElement).find("#myModal").find("#createArticle").summernote("code");

    var info = {title: title, topic: topic, description: description, date: date, section: section, text: text}
      
    this._articlesService.createArticle(info).subscribe(
      response => {
        this.ngOnInit();
        this.resetAll();
      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )
    
  }

  public resetAll(){
    var title = jQuery(this._elRef.nativeElement).find("#myModal").find("#title").val("");
    var topic = jQuery(this._elRef.nativeElement).find("#myModal").find("#topic").val("");
    var description = jQuery(this._elRef.nativeElement).find("#myModal").find("#description").val("");
    var section = jQuery(this._elRef.nativeElement).find("#myModal").find("#section").val("");
    var date = jQuery(this._elRef.nativeElement).find("#myModal").find("#date").val("");
    var text = jQuery(this._elRef.nativeElement).find("#myModal").find("#createArticle").summernote("reset");
  }

  public updateItem(id){
    var title = jQuery(this._elRef.nativeElement).find("#toEdit").find("#title").val();
    var topic = jQuery(this._elRef.nativeElement).find("#toEdit").find("#topic").val();
    var description = jQuery(this._elRef.nativeElement).find("#toEdit").find("#description").val();
    var section = jQuery(this._elRef.nativeElement).find("#toEdit").find("#section").val();
    var date = jQuery(this._elRef.nativeElement).find("#toEdit").find("#date").val();
    var text = jQuery(this._elRef.nativeElement).find("#toEdit").find("#editArticle").summernote("code");

    var info = {title: title, topic: topic, description: description, date: date, section: section, text: text}

    this._articlesService.updateArticle(id, info).subscribe(
      response => {
        this.ngOnInit();
      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )
  }

  public openItem(id){
    this._articlesService.getRelease(id).subscribe(
      response => {
        this.article = response;
        jQuery(this._elRef.nativeElement).find("#editArticle").summernote('code', this.article.text);
        var dateSplit = this.article.date.split("T");
        this.date = dateSplit[0];
        console.log(this.article)
      }, error =>{
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      });
  }

  public deleteArticle(id){
    this._articlesService.deleteArticle(id).subscribe(
      response => {
        this.ngOnInit();
      },error =>{
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )
  }

}
