import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  constructor(private router : Router, 
    private service : RequestService,) { }
    username? : string;
    data : any[] = [];
    response : any[] =[];
    file? : File;
  ngOnInit(): void {
    this.username = localStorage.getItem("username") ??"";
    this.service.getData(this.username).subscribe(
      data=>{
        this.response  = JSON.parse(data.body)
        for  (let i = 0; i < this.response.length; i++) {
          // console.log(this.response[i]);
          let data1 = this.response[i].fields;
          data1['id'] = this.response[i].pk;
          this.data.push(data1);
        }
        // console.log(this.data1)
      },
      error=>{

      }
    )
  }
  submitFile(){
    console.log(this.file)
    if(this.file != null)
    this.service.postFile(localStorage.getItem("username")!,this.file).subscribe(
       data=>{
         this.data.concat(data);
       },
       error=>{
        // alert("Something went wrong please try again.")
       }
      )
  }
  logout(){
    alert("User Logged out.");
    this.router.navigate(['login']);
  }
  setFiles(event : any) {
    this.file = event.srcElement.files[0]
    console.log(event.srcElement.files[0])
    if (!this.file) {
      return
    }
    // this.file = event.target.files[0];
      // this.myForm.patchValue({
      //   fileSource: file
      // });
  }

}
