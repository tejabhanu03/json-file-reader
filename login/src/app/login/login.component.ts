import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestService } from '../request.service';
import { User } from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm  = new FormGroup({
    user : new FormControl(''),
    password : new FormControl('')
  });
   loginuser : User = new User();
  constructor( private service : RequestService, private router: Router) { }

  ngOnInit(): void {
    
  }
  
  loginUser(){ 
    this.loginuser.username = this.loginForm.get('user')?.value;
    this.loginuser.password = this.loginForm.get('password')?.value;
    localStorage.setItem("username", this.loginuser.username);
    this.service.logIn(this.loginuser).subscribe(
      data=>{ 
        this.router.navigate(['/fileupload']);
      },
      error=>{
        alert("login failed")
      }
    )
    
    
  }
  registerUser(){
    this.router.navigate(['/register']);
  }

}


