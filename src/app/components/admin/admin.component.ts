import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { AdminService } from '../../services/admin.service';
import {ElementRef} from '@angular/core';
declare var jQuery:any;

import {User} from '../../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AdminService]
})
export class AdminComponent implements OnInit {
  public data;
  public create:Boolean;
  public user:User;

  constructor(private _adminService:AdminService,
    private _elRef: ElementRef) {
      this.create = false;
      this.user = new User("","","","","","");
     }

  ngOnInit() {
    this._adminService.getAllUsers().subscribe(
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
  }

  public newUser(state){
    this.create = state;
  }

  public createUser(){
    this._adminService.createUser(this.user).subscribe(
      response => {
        this.ngOnInit();
        this.user = new User("","","","","","");
        this.create = false;
      }, error =>{
        var errorMessage = <any>error;
        
        if(errorMessage != null){
          console.log(error);
          console.log("Here is a mistake")
        }
      }
    )
  }

  public deleteUser(id){
    this._adminService.deleteUser(id).subscribe(
      reponse => {
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

}
