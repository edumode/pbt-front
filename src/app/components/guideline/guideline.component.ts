import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { GuidelineService } from '../../services/guideline.service';
import {ElementRef} from '@angular/core';
declare var jQuery:any;

import { Guideline } from "../../models/guideline";


@Component({
  selector: 'app-guideline',
  templateUrl: './guideline.component.html',
  styleUrls: ['./guideline.component.css'],
  providers: [GuidelineService]
})
export class GuidelineComponent implements OnInit {
  public data;
  public date;
  public find;
  public errorMessage;
  public guideline:Guideline;
  //This is just for updates only
  public name;
  public role;

  constructor(private _guidelineService:GuidelineService,
              private _elRef: ElementRef) { 
              
              this.guideline = new Guideline("","","","","");

              let name = localStorage.getItem("name");
              let role = localStorage.getItem("role");
         
              let nameSplit = name.split('"');
              let roleSplit = role.split('"');
         
              this.name = nameSplit[1];
              this.role = roleSplit[1];         
  }

  ngOnInit() {
    this._guidelineService.getGuideline().subscribe(
    response => {
      this.data = response;

      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(this.errorMessage = error._body);
            console.log("Here is a mistake")
        }
      }
    );  
  }

  public createGuide(){
    jQuery(this._elRef.nativeElement).find("#createGuide").summernote();
  }

  createItem(){
    var index = jQuery(this._elRef.nativeElement).find("#toCreate").find("#index").val();
    var title = jQuery(this._elRef.nativeElement).find("#toCreate").find("#title").val();
    var text = jQuery(this._elRef.nativeElement).find("#toCreate").find("#createGuide").summernote('code');
    var date = jQuery(this._elRef.nativeElement).find("#toCreate").find("#date").val();

    var data = { index: index, title: title, text: text, date: date } 
    
    this._guidelineService.createGuideline(data).subscribe(
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
    var index = jQuery(this._elRef.nativeElement).find("#toCreate").find("#index").val("");
    var title = jQuery(this._elRef.nativeElement).find("#toCreate").find("#title").val("");
    var text = jQuery(this._elRef.nativeElement).find("#toCreate").find("#createGuide").summernote('reset');
    var date = jQuery(this._elRef.nativeElement).find("#toCreate").find("#date").val("");
  }

  public editItemInModal(id){
    this._guidelineService.getOneGuideline(id).subscribe(
      response => {
        this.guideline = response;
        jQuery(this._elRef.nativeElement).find("#toEdit").find("#editGuide").summernote('code', this.guideline.text);
        var dateSplit = this.guideline.date.split("T");
        this.date = dateSplit[0];
      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )
       
  }

  public updateItem(id){
    var text = jQuery(this._elRef.nativeElement).find("#toEdit").find("#editGuide").summernote('code');
    var index = jQuery(this._elRef.nativeElement).find("#toEdit").find("#index").val();
    var title = jQuery(this._elRef.nativeElement).find("#toEdit").find("#title").val();
    var date = jQuery(this._elRef.nativeElement).find("#toEdit").find("#date").val();
    
    var toUpdate = {text: text, index: index, title: title, date: date}

    this._guidelineService.editItemGuide(id, toUpdate).subscribe(
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

  public deleteGuide(id){
    this._guidelineService.deleteGuide(id).subscribe(
      response => {
        this.ngOnInit()
      }, error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    );
  }

}
