import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { User } from '../User';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.css']
})
export class RegistorComponent implements OnInit {
  registerForm  = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
    fulladdress : new FormControl('')
  });
  loginuser : User = new User();
  constructor(private router : Router ,  private service : RequestService,) { }

  ngOnInit(): void {
  }
  registerUser(){
    this.loginuser.username = this.registerForm.get('email')?.value;
    this.loginuser.password = this.registerForm.get('password')?.value;
    this.loginuser.completeAdreess = this.registerForm.get('fulladdress')?.value;
    localStorage.setItem("username", this.loginuser.username);
    this.service.regesterUser(this.loginuser).subscribe(
      data=>{
        alert("User created successfully.");
        this.router.navigate(['login']);
      },
      error=>{
        alert("Something went wrong, Please try again");
      }
    )
    
  }
  loginPage(){
    this.router.navigate(['login']);
  }

}
