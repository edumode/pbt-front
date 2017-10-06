import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {ElementRef} from '@angular/core';
declare var jQuery:any;

import { TodayService } from '../../services/today.service';
import { ArticlesService } from '../../services/articles.service';

import { Today } from '../../models/today';
import { Articles } from '../../models/articles';

@Component({
  selector: 'app-today',  
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
  providers: [TodayService, ArticlesService]
})
export class TodayComponent implements OnInit {
  public today:Today;
  public item:Articles;
  public list;
  public itemToEdit;
  //
  public reinforcements;
  public releases;
  //
  public name;
  public role;

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _todayService:TodayService,
    private _articlesService:ArticlesService,
    private _elRef: ElementRef ) { 
    this.today = new Today("","");
    this.item = new Articles("","","","","","","");      

     let name = localStorage.getItem("name");
     let role = localStorage.getItem("role");

     let nameSplit = name.split('"');
     let roleSplit = role.split('"');

     this.name = nameSplit[1];
     this.role = roleSplit[1];

};


  ngOnInit() {

    this._todayService.getReminders().subscribe(
      response => {
       this.list = response;
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error._body);
            console.log("Here is a mistake")
        }
      }
    );

    this._articlesService.getArticleSection("release").subscribe(
      response => {
        this.releases = response;
        console.log(this.releases);
      }, error => {
        var errorMessage = <any>error;
        
        if(errorMessage != null){
            console.log(error._body);
            console.log("Here is a mistake")
        }
      }
    );

    this._articlesService.getArticleSection("reinforcement").subscribe(
      response => {
        this.reinforcements = response;
        console.log(this.reinforcements);
      }, error => {
        var errorMessage = <any>error;
        
        if(errorMessage != null){
            console.log(error._body);
            console.log("Here is a mistake")
        }
      }
    );

  }

  public openArticle(id){
    this._articlesService.getRelease(id).subscribe(
      reponse => {
        this.item = reponse;
      }, error => {
        var errorMessage = <any>error;
        
          if(errorMessage != null){
              console.log(error);
              console.log("Here is a mistake")
          }
      }
    )
  }

  public createToday(){
    jQuery(this._elRef.nativeElement).find("#createToday").summernote();
  }

  public createItem(){
    var content = jQuery(this._elRef.nativeElement).find("#createToday").summernote('code');
    var more = {text: content}
    this._todayService.createReminder(more).subscribe(
      response => {
        this.ngOnInit();
        jQuery(this._elRef.nativeElement).find("#note").summernote('reset');
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
  }

  public editItemInModal(id){
    this._todayService.getReminder(id).subscribe(
      response => {
        this.itemToEdit = response;
        jQuery(this._elRef.nativeElement).find("#editToday").summernote('code', this.itemToEdit.text);
        console.log(this.itemToEdit);
      }, error => {
        var errorMessage = <any>error;
        
        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
  }

  public updateItem(){
    var id = this.itemToEdit._id;
    var text = jQuery(this._elRef.nativeElement).find("#editToday").summernote('code');
    var more = {text: text}
    
    this._todayService.editReminder(id, more).subscribe(
      response => {
        this.ngOnInit();
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
    
  }

  public deleteItem(id){
    this._todayService.deleteReminder(id).subscribe(
      response => {
        console.log("it was deleted");
        this.ngOnInit();
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
  }  

}
