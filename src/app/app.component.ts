import { Component } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from './services/user.service';

import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {
  public title = 'Pre-billing Process Manual';
  public footer = 'Footer';
  public logged = false;
  public user:User;
  public errorMessage;
  public name;
  public role;

   constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _userService:UserService){
              this.user = new User("","","","","","");
            }


  public getUser(){
    this._userService.show(this.user).subscribe(
      response => {
       this.user = response;
       let name = this.user.name;
       let role = this.user.role;

       localStorage.setItem("name", JSON.stringify(name));
       localStorage.setItem("role", JSON.stringify(role));

       let nameS = localStorage.getItem("name");
       let roleS = localStorage.getItem("role");
  
       let nameSplit = nameS.split('"');
       let roleSplit = roleS.split('"');
  
       this.name = nameSplit[1];
       this.role = roleSplit[1];

       this.user = new User("","","","","","");
    
       this.logged = true;
       this._router.navigate(['/']);
      },
      error => {
        var errorMessage = <any>error;

          if(errorMessage != null){
              console.log(this.errorMessage = error._body);
              console.log("Here is a mistake")
          }
      }
    )
  }

  public logoff(){
    this.logged = false;
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.clear();
  }


}
