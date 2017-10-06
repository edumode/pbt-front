import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import {ElementRef} from '@angular/core';
declare var jQuery:any;

import { GLOBAL } from "../../services/global"

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css'],
  providers: [ToolsService]
})
export class ToolsComponent implements OnInit {
  public data;
  //
  public name;
  public role;
  public url;

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _toolsService:ToolsService,
    private _elRef: ElementRef) {
      let name = localStorage.getItem("name");
      let role = localStorage.getItem("role");
 
      let nameSplit = name.split('"');
      let roleSplit = role.split('"');
 
      this.name = nameSplit[1];
      this.role = roleSplit[1];

      this.url = GLOBAL.url;
     }

  ngOnInit() {
    this._toolsService.getTools().subscribe(
      response => {
        this.data = response;
      }, error => {
        var errorMessage = <any>error;
        
        if(errorMessage != null){
            console.log(error);
            console.log("Here is a mistake")
        }
      }
    )
  }

  //Upload files
  public filesToUpload: Array<File>;

  public uploadFile(){
    this.makeFileRequest(this.url+'create-tool/',[],this.filesToUpload).then(
      (result: any) => {
        this.ngOnInit();   
      }
    )
  }
  
  public fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  
  public makeFileRequest(url: string, params:Array<string>, files: Array<File>){

      return new Promise(function(resolve, reject){
          var formData: any = new FormData();
          var xhr = new XMLHttpRequest();

          for(var i = 0; i< files.length; i++){
              formData.append('file', files[i], files[i].name)
          }

          xhr.onreadystatechange = function (){
              if(xhr.readyState == 4){
                  if(xhr.status == 200){
                      resolve(JSON.parse(xhr.response))
                  }else{
                      reject(xhr.response)
                  }
              }
          }

          xhr.open('POST', url, true);
          xhr.send(formData);
      });     
  }

  //Delete files
  public deleteFile(id){
    this._toolsService.deleteTool(id).subscribe(
      response => {
        this.ngOnInit();
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
